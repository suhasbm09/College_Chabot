// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import College from "./pages/College";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout wraps pages like College */}
        <Route path="/" element={<Layout />}>
          {/* Render College at the root path */}
          <Route index element={<College />} />
          {/* If you have other pages, add them here:
              <Route path="about" element={<About />} />
              <Route path="campus" element={<Campus />} />
          */}
        </Route>

        {/* Chat interface stands alone at /chat */}
        <Route path="/chat" element={<Chatbot />} />

        {/* Fallback for unmatched routes (optional) */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
              <h1 className="text-3xl">404 – Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
