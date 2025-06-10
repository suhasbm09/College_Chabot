import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/nielogo.png";
import Footer from "../components/Footer";

const Chatbot = () => {
  const navigate = useNavigate();

  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionEmail, setSuggestionEmail] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [rating, setRating] = useState(0);
  const [flashMessage, setFlashMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "NIBO",
      text: "👋 Hello! I'm NIBO — your NIE College AI assistant. Ask me anything!",
      time: new Date(),
      fromBot: true,
    },
    {
      sender: "NIBO",
      text: `🎓 I can help you with admissions, courses, placements, hostel info, and more!`,
      time: new Date(),
      fromBot: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => setFlashMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setInterimTranscript("");
    };
    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += transcript;
        else interim += transcript;
      }
      setInterimTranscript(interim);
      if (final) setInputText(final);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;
  }, []);

  const handleSpeechClick = () => {
    if (!recognitionSupported) {
      setFlashMessage("Speech Recognition not supported in this browser.");
      return;
    }
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
  };

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: suggestionEmail,
          message: suggestionText,
          rating,
        }),
      });
      if (res.ok) {
        setFlashMessage("Suggestion submitted!");
        setSuggestionEmail("");
        setSuggestionText("");
        setRating(0);
        setShowSuggestion(false);
      } else {
        setFlashMessage("Submission failed. Please try again.");
      }
    } catch {
      setFlashMessage("Network error. Please try again.");
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { sender: "You", text, time: new Date(), fromBot: false },
    ]);
    setInputText("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: "NIBO",
          text: data.response || "Sorry, I couldn’t understand. Try again!",
          time: new Date(),
          fromBot: true,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "NIBO",
          text: "Sorry, I couldn’t fetch a response. Try again later.",
          time: new Date(),
          fromBot: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setRating(i + 1)}
        className="text-3xl hover:text-cyan-400 transition"
      >
        {i < rating ? "★" : "☆"}
      </button>
    ));
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black text-gray-100">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-16 left-16 w-96 h-96 bg-purple-600/30 opacity-40 rounded-full blur-3xl" />
        <span className="absolute bottom-16 right-16 w-96 h-96 bg-blue-600/30 opacity-50 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-2 left-2 right-2 z-50 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl drop-shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="NIBO Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold text-cyan-300">NIBO</span>
          </div>
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setShowSuggestion(true)}
              className="text-white/80 hover:text-cyan-300 underline text-lg"
            >
              Suggestion Box
            </button>
            <button
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-cyan-300 text-3xl"
            >
              &times;
            </button>
          </div>
        </div>
      </header>

      {/* Suggestion Box */}
      {showSuggestion && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-3xl flex justify-center items-center z-40"
          onClick={() => setShowSuggestion(false)}
        >
          <div
            className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSuggestion(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-cyan-300 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Suggestion Box</h2>
            <form onSubmit={handleSuggestionSubmit} className="space-y-6">
              <input
                type="email"
                required
                value={suggestionEmail}
                onChange={(e) => setSuggestionEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-3 rounded bg-gray-800 border border-white/20 text-white placeholder-gray-400"
              />
              <textarea
                rows="5"
                required
                value={suggestionText}
                onChange={(e) => setSuggestionText(e.target.value)}
                placeholder="Type your suggestion here..."
                className="w-full p-3 rounded bg-gray-800 border border-white/20 text-white placeholder-gray-400"
              />
              <div className="space-y-2">
                <label className="text-white/80 text-lg">Rating</label>
                <div className="flex space-x-2">{renderStars()}</div>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-indigo-600 text-white py-3 px-8 rounded-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Flash Message */}
      {flashMessage && (
        <div className="fixed top-24 inset-x-0 flex justify-center z-30 px-4">
          <div className="bg-white/10 border border-white/10 rounded-lg p-4 backdrop-blur-lg shadow-lg w-full max-w-2xl flex justify-between items-center">
            <span>{flashMessage}</span>
            <button
              onClick={() => setFlashMessage("")}
              className="text-white/80 hover:text-cyan-300 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Chat Section */}
      <main className="flex-grow pt-24 pb-24 px-4">
        <div className="max-w-7xl mx-auto h-[calc(100vh-16rem)] bg-gray-950/90 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div
            ref={chatContainerRef}
            className="flex-grow px-8 py-6 overflow-y-auto space-y-6"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.fromBot ? "justify-start" : "justify-end"}`}
              >
                <div className="max-w-[70%] flex items-start space-x-3">
                  {msg.fromBot && (
                    <img src={Logo} alt="NIBO" className="w-10 h-10 rounded-full" />
                  )}
                  <div className="flex flex-col">
                    <div
                      className={`p-4 rounded-2xl shadow-lg ${
                        msg.fromBot
                          ? "bg-white/10 text-white"
                          : "bg-blue-600/50 text-white"
                      }`}
                    >
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span className="font-semibold">
                          {msg.fromBot ? "NIBO" : "You"}
                        </span>
                        <span>
                          {msg.time.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                  {!msg.fromBot && (
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/007/409/979/original/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg"
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[70%] flex items-start space-x-3">
                  <img src={Logo} alt="NIBO" className="w-10 h-10 rounded-full" />
                  <div className="p-4 rounded-2xl bg-white/10 text-white shadow-lg">
                    <div className="text-sm text-gray-300 mb-1 font-semibold">NIBO</div>
                    <div className="flex space-x-2 text-xl items-center">
                      <span className="w-2.5 h-2.5 bg-white rounded-full dot-bounce"></span>
                      <span className="w-2.5 h-2.5 bg-white rounded-full dot-bounce dot-bounce-delay-200"></span>
                      <span className="w-2.5 h-2.5 bg-white rounded-full dot-bounce dot-bounce-delay-400"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Input */}
          <form
            onSubmit={handleChatSubmit}
            className="flex items-center px-8 py-4 border-t border-white/10"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-4 py-3 rounded-l-full bg-black/30 text-white placeholder-gray-400 focus:outline-emerald-600"
            />
            <button
              type="button"
              onClick={handleSpeechClick}
              className="ml-2 p-3 bg-black/30 hover:bg-cyan-500 rounded-xl text-white"
            >
              🎤
            </button>
            <button
              type="submit"
              className="ml-2 px-6 py-3 bg-cyan-600 hover:bg-indigo-600 text-white rounded-xl"
            >
              Send
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chatbot;
