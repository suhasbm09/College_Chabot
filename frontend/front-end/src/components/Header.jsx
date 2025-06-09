// src/components/Header.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/nielogo.png'
import Modal from './Modal'

const Header = () => {
  const [showAbout, setShowAbout] = useState(false)
  const [showContact, setShowContact] = useState(false)

  return (
    <>
      <header className="fixed top-2 left-2 right-2 z-50 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-2xl drop-shadow-2xl">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
          {/* Logo + Site Name */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="relative w-12 h-12">
              <img
                src={Logo}
                alt="NIE Logo"
                className="w-full h-full object-contain drop-shadow-lg"
              />
              <span className="absolute inset-0 blur-2xl bg-cyan-500 opacity-20 rounded-full"></span>
            </div>
            <span className="text-3xl font-extrabold text-cyan-300 hover:text-cyan-100 transition-colors duration-200">
              NIE
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-12">
            <li>
              <button
                disabled
                className="
                  relative text-lg font-semibold text-white/80 
                  before:absolute before:-bottom-1 before:left-0 
                  before:h-0.5 before:w-0 
                  before:bg-cyan-400 before:transition-all before:duration-300 
                  hover:text-cyan-200 
                  hover:before:w-full
                  cursor-not-allowed
                "
              >
                Home
              </button>
            </li>
            <li>
              <button
                disabled
                className="
                  relative text-lg font-semibold text-white/80 
                  before:absolute before:-bottom-1 before:left-0 
                  before:h-0.5 before:w-0 
                  before:bg-cyan-400 before:transition-all before:duration-300 
                  hover:text-cyan-200 
                  hover:before:w-full
                  cursor-not-allowed
                "
              >
                Campus
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowAbout(true)}
                className="
                  relative text-lg font-semibold text-white/80 
                  before:absolute before:-bottom-1 before:left-0 
                  before:h-0.5 before:w-0 
                  before:bg-cyan-400 before:transition-all before:duration-300 
                  hover:text-cyan-200 
                  hover:before:w-full
                  focus:outline-none
                "
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowContact(true)}
                className="
                  relative text-lg font-semibold text-white/80 
                  before:absolute before:-bottom-1 before:left-0 
                  before:h-0.5 before:w-0 
                  before:bg-cyan-400 before:transition-all before:duration-300 
                  hover:text-cyan-200 
                  hover:before:w-full
                  focus:outline-none
                "
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button className="text-white/80 hover:text-cyan-200 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 drop-shadow-lg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* About Modal */}
      {showAbout && (
        <Modal onClose={() => setShowAbout(false)} title="About This Project">
          <div className="space-y-6 max-w-5xl text-gray-200 leading-relaxed">
            <p className="text-lg">
              Built by CSE students:
              <strong className="text-cyan-300"> Suhas B H</strong>,
              <strong className="text-cyan-300"> Suhas B M</strong>,
              <strong className="text-cyan-300"> Nischith S</strong>, and
              <strong className="text-cyan-300"> Rohan P N</strong>.
            </p>
            <p className="text-lg">
              This AI-powered College Enquiry Chatbot is a comprehensive upgrade, featuring:
            </p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Modern React + TailwindCSS frontend with glassmorphic design.</li>
              <li>Advanced RAG-driven AI backend integrating OpenRouter.</li>
              <li>Firebase-powered suggestion storage and rating system.</li>
              <li>Responsive, dark-mode-first, premium UI/UX.</li>
            </ul>
            <p className="text-lg">
              Our aim is to simulate a real-world college enquiry system that not only looks
              sleek but also feels intuitive and futuristic.
            </p>
          </div>
        </Modal>
      )}

      {/* Contact Modal */}
      {showContact && (
        <Modal onClose={() => setShowContact(false)} title="Contact Us">
          <div className="space-y-6 max-w-3xl text-gray-200">
            <p className="text-lg">
              <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:universe@gmail.com" className="text-cyan-300 hover:underline">
                universe@gmail.com
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:+919876543210" className="text-cyan-300 hover:underline">
                +91 98765 43210
              </a>
            </p>
            <p className="text-lg">
              For any queries or partnership opportunities, feel free to reach out!
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Header
