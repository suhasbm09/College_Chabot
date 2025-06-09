from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from rag_pipeline import run_rag_pipeline


# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Firebase
cred = credentials.Certificate("firebase-service-key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# ✅ POST /api/suggestions — from Chatbot.jsx
@app.route("/api/suggestions", methods=["POST"])
def submit_suggestion():
    try:
        data = request.json
        email = data.get("email")
        message = data.get("message")
        rating = data.get("rating")

        if not email or not message or rating is None:
            return jsonify({"error": "Missing fields"}), 400

        # Generate a document with auto ID
        doc_ref = db.collection("suggestions").document()
        doc_ref.set({
            "email": email,
            "message": message,
            "rating": rating,
            "submitted_at": firestore.SERVER_TIMESTAMP
        })

        return jsonify({"success": True, "message": "Suggestion stored ✅"}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ✅ POST /api/chat — from Chatbot.jsx
@app.route("/api/chat", methods=["POST"])
def chat_response():
    try:
        data = request.json
        user_query = data.get("message")

        if not user_query:
            return jsonify({"error": "No message provided"}), 400

        answer = run_rag_pipeline(user_query)
        return jsonify({"response": answer}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/ping")
def ping():
    return jsonify({"message": "Server is running ✅"})

if __name__ == "__main__":
    app.run(debug=True)
