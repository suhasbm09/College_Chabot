import os
import json
import requests
import pickle
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import urllib.parse
from bs4 import BeautifulSoup

load_dotenv()


DATA_PATH = "./data/dataset.json"
INDEX_PATH = "./embeddings/faiss_index/index.bin"
EMBEDDINGS_PATH = "./embeddings/faiss_index/embeddings.pkl"

# --- Use smaller + faster model ---
EMBED_MODEL_NAME = "all-MiniLM-L6-v2"
USE_GPU = False  # Set True if CUDA available

# --- Logging tweak for Flask ---
if __name__ != "__main__":
    import logging
    logging.getLogger("sentence_transformers.SentenceTransformer").setLevel(logging.ERROR)

# --- Load dataset ---
def load_data():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

# --- Load/create FAISS index ---
def get_faiss_index(questions):
    device = "cuda" if USE_GPU else "cpu"
    embed_model = SentenceTransformer(EMBED_MODEL_NAME, device=device)

    if os.path.exists(INDEX_PATH) and os.path.exists(EMBEDDINGS_PATH):
        index = faiss.read_index(INDEX_PATH)
        with open(EMBEDDINGS_PATH, "rb") as f:
            question_embeddings = pickle.load(f)
        return index, question_embeddings, embed_model

    question_embeddings = embed_model.encode(questions, convert_to_numpy=True)
    dim = question_embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(question_embeddings)

    faiss.write_index(index, INDEX_PATH)
    with open(EMBEDDINGS_PATH, "wb") as f:
        pickle.dump(question_embeddings, f)

    return index, question_embeddings, embed_model

# --- Retrieve top-K context ---
def retrieve_contexts(user_query, index, questions, question_embeddings, data, embed_model, top_k=3):
    query_embedding = embed_model.encode([user_query])
    D, I = index.search(query_embedding, top_k)
    return [data[i]["response"][:500] for i in I[0]]

# --- DuckDuckGo fallback search for nie.ac.in ---
def fallback_duckduckgo_search(query, max_results=3):
    try:
        encoded_query = urllib.parse.quote(f"site:nie.ac.in {query}")
        url = f"https://html.duckduckgo.com/html/?q={encoded_query}"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        results = []
        for result in soup.find_all("a", class_="result__a", limit=max_results):
            text = result.get_text()
            href = result.get("href")
            results.append(f"{text} - {href}")
        return results if results else ["No relevant result found."]
    except Exception as e:
        return [f"❌ Fallback search failed: {str(e)}"]

# --- Query OpenRouter API with tuned prompt ---
def query_openrouter_api(contexts, user_query):
    prompt = f"""
You are the official AI assistant of NIE College, Mysuru. You provide helpful, respectful, and accurate answers to students, parents, and visitors. Use only the given context to answer the question. If the answer cannot be found in the context, politely guide the user to refer to the official NIE College website or contact the administration.
Also if asked about Insformation Science field say politely it is closed or no more admission is taken.
Be friendly, polite, professional and accurate. If anything is not found in dataset, guide to check nie.ac.in. If not related to NIE, politely decline and redirect to college-related questions.
and be more friendly and make user feel they are talking to human.

📌 CONTEXT:
{chr(10).join(contexts)}

🎯 QUESTION:
{user_query}

✅ ANSWER (Be accurate. If unsure, say: "Please check the official website or contact the college office."):
"""

    headers = {
        "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://college-enquiry-chatbot.vercel.app",
        "X-Title": "College Enquiry Chatbot"
    }

    payload = {
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.5
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload, timeout=15)
        result = response.json()
        if "choices" in result:
            return result["choices"][0]["message"]["content"].strip()
        else:
            # Fallback if API returns error
            search_results = fallback_duckduckgo_search(user_query)
            return f"🔍 Couldn't find a direct answer.\nTry referring to these from NIE website:\n\n" + "\n".join(search_results)
    except Exception as e:
        search_results = fallback_duckduckgo_search(user_query)
        return f"⚠️ API Error: {str(e)}\n\n🔍 Here's what we found from NIE site:\n" + "\n".join(search_results)

# --- Preload for caching ---
print("🔄 Loading and caching embeddings...")
DATA = load_data()
QUESTIONS = [item["input"] for item in DATA]
INDEX, QUESTION_EMBEDDINGS, EMBED_MODEL = get_faiss_index(QUESTIONS)
print("✅ RAG pipeline ready.")

# --- Final main function ---
def run_rag_pipeline(user_query):
    contexts = retrieve_contexts(user_query, INDEX, QUESTIONS, QUESTION_EMBEDDINGS, DATA, EMBED_MODEL)
    return query_openrouter_api(contexts, user_query)
