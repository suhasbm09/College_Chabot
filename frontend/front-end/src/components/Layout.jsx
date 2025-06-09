// src/components/Layout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatbotBubble from './ChatbotBubble'

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 selection:bg-purple-600 selection:text-white">
      {/* ===== Glow Accents (behind all content) ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse" />
        <span className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* ===== Floating Header ===== */}
      <Header />

      {/* ===== Main Content Area ===== */}
      <main className="pt-20 pb-16 flex-grow">
        {/* 
          pt-20 offsets the fixed header (approx. 80px). 
          pb-16 ensures there’s space for the footer (approx. 64px). 
        */}
        <Outlet />
      </main>

      {/* ===== Footer ===== */}
      <Footer />

      {/* ===== Chatbot Bubble (fixed on screen) ===== */}
      <ChatbotBubble />
    </div>
  )
}

export default Layout
