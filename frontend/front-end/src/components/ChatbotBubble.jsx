// src/components/ChatbotBubble.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/nielogo.png";

const ChatbotBubble = () => {
  const [showGreeting, setShowGreeting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center group space-y-2">
      {/* Floating greeting bubble */}
      {showGreeting && (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl py-3 px-6 drop-shadow-xl animate-fadeIn">
          <span className="text-cyan-300 text-base font-medium">
            Hey! How can I help you?
          </span>
        </div>
      )}

      {/* Tooltip (appears on hover) */}
      <span
        className="
          px-3 py-1 
          text-sm font-medium 
          text-white 
          bg-black/60 backdrop-blur-sm 
          rounded-full 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-200
        "
      >
        Chat with UniVerse
      </span>

      {/* Pulsing ring behind the bubble */}
      <span className="
        absolute 
        w-16 h-16 
        bg-cyan-600/20 
        rounded-full 
        animate-ping 
      " />

      {/* Circular bubble Link */}
      <Link
        to="/chat"
        aria-label="Open Chatbot"
        className="
          relative 
          flex items-center justify-center 
          w-16 h-16 
          bg-gradient-to-br from-cyan-500 to-indigo-600 
          rounded-full 
          shadow-2xl 
          transform transition-transform duration-300 
          hover:scale-110 active:scale-95
        "
      >
        <img src={Logo} alt="UniVerse Logo" className="w-8 h-8" />
      </Link>
    </div>
  );
};

export default ChatbotBubble;
