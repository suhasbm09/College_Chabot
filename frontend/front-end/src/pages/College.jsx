// src/pages/College.jsx
import React from 'react'
import SouthCampus from '../assets/NIE_South.jpg'
import NorthCampus from '../assets/NIE_North.jpg'
import PrincipalImg from '../assets/principal.jpg'
import Placement1 from '../assets/Placement.png'
import Placement2 from '../assets/placemnt-2.png'
import Placement3 from '../assets/Placement-3.png'
import MapSouth from '../assets/image2.png'
import MapNorth from '../assets/image.png'

const College = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      {/* ===== Animated Glow Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-32 left-16 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <span className="absolute bottom-32 right-16 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* ===== Hero Section ===== */}
      <section className="relative w-full h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-50 z-0"
          style={{ backgroundImage: `url(${SouthCampus})` }}
        />
        <div className="relative z-10 text-center px-4 sm:px-8 md:px-16 lg:px-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 bg-white/10 backdrop-blur-3xl rounded-3xl py-8 px-10 text-green-500 drop-shadow-2xl">
            Welcome to <br /> National Institute of Engineering
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Shaping Innovators Since 1946. Discover programs, campus life, and a community dedicated to excellence.
          </p>
          <button className="px-10 py-4 text-2xl font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-2xl transform hover:scale-105 hover:shadow-cyan-500/50 transition duration-300">
            Explore NIE
          </button>
        </div>
      </section>

      {/* ===== Notice & Highlights ===== */}
      <section className="py-20 px-6 flex justify-center">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-10 drop-shadow-2xl">
          <h2 className="text-4xl text-cyan-400 font-semibold mb-6 text-center">
            Latest Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-200">
              <h3 className="text-2xl font-bold text-indigo-300 mb-2">Placements</h3>
              <p className="text-gray-200 mb-4">Top recruiters onboarded this season.</p>
              <img src={Placement1} alt="Placements" className="mx-auto w-32 h-32 object-contain" />
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-200">
              <h3 className="text-2xl font-bold text-indigo-300 mb-2">Research Labs</h3>
              <p className="text-gray-200 mb-4">15+ Centers of Excellence for innovation.</p>
              <img src={Placement2} alt="Labs" className="mx-auto w-32 h-32 object-contain" />
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-200">
              <h3 className="text-2xl font-bold text-indigo-300 mb-2">Student Life</h3>
              <p className="text-gray-200 mb-4">Vibrant campus culture and events.</p>
              <img src={Placement3} alt="Campus Life" className="mx-auto w-32 h-32 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Campus Showcase ===== */}
      <section className="py-20 px-6">
        <h2 className="text-4xl text-cyan-400 font-semibold text-center mb-12">
          Explore Our Campuses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={NorthCampus}
              alt="North Campus"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-3xl text-indigo-300 font-bold mb-2">North Campus</h3>
              <button className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg hover:shadow-cyan-500/50 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={SouthCampus}
              alt="South Campus"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-3xl text-indigo-300 font-bold mb-2">South Campus</h3>
              <button className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg hover:shadow-cyan-500/50 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== About Us ===== */}
      <section className="py-20 px-6">
        <h2 className="text-4xl text-cyan-400 font-semibold text-center mb-12">
          Why NIE?
        </h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-10">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 drop-shadow-2xl hover:bg-white/10 transition-colors duration-200">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">Legacy of Excellence</h3>
            <p className="text-gray-200 text-lg leading-relaxed">
              Established in 1946, NIE consistently ranks among India’s top engineering institutes.
              Accredited by NAAC and recognized by AICTE, our alumni lead across industry and academia.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 drop-shadow-2xl hover:bg-white/10 transition-colors duration-200">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">Industry & Research</h3>
            <p className="text-gray-200 text-lg leading-relaxed">
              With 15+ Centres of Excellence and strong industry partnerships, students engage in
              cutting-edge research and real-world projects from day one.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 drop-shadow-2xl hover:bg-white/10 transition-colors duration-200">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">Vibrant Campus Life</h3>
            <p className="text-gray-200 text-lg leading-relaxed">
              Beyond academics, NIE offers rich extracurriculars—clubs, festivals, and cultural events
              that foster community and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Principal's Message ===== */}
      <section className="py-20 px-6">
        <h2 className="text-4xl text-cyan-400 font-semibold text-center mb-12">
          Principal’s Message
        </h2>
        <div className="flex flex-col lg:flex-row items-center max-w-4xl mx-auto bg-white/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 drop-shadow-2xl gap-8">
          <img
            src={PrincipalImg}
            alt="Principal"
            className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
          />
          <div className="text-center lg:text-left">
            <p className="italic font-serif text-xl text-gray-200 leading-relaxed mb-4 tracking-wide">
              “At NIE, we believe in holistic education—fostering both technical expertise and
              character. Our commitment to Outcome Based Education ensures every graduate is
              industry-ready and globally competitive.”
            </p>
            <p className="text-indigo-300 font-semibold text-xl">– Dr. Rohini Nagapadma</p>
          </div>
        </div>
      </section>

      {/* ===== Explore Courses ===== */}
      <section className="py-20 px-6">
        <h2 className="text-4xl text-cyan-400 font-semibold text-center mb-12">
          Explore Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-8 drop-shadow-2xl hover:bg-white/10 transition-colors duration-200">
            <h3 className="text-2xl text-cyan-300 font-bold mb-4 border-b border-cyan-300 pb-2">
              Undergraduate
            </h3>
            <ul className="space-y-3 text-lg text-gray-200 tracking-wide">
              <li className="hover:text-cyan-300 cursor-pointer">Computer Science & Engineering</li>
              <li className="hover:text-cyan-300 cursor-pointer">AI & Machine Learning</li>
              <li className="hover:text-cyan-300 cursor-pointer">Electronics & Communication</li>
              <li className="hover:text-cyan-300 cursor-pointer">Electrical & Electronics</li>
              <li className="hover:text-cyan-300 cursor-pointer">Civil Engineering</li>
              <li className="hover:text-cyan-300 cursor-pointer">Mechanical Engineering</li>
            </ul>
          </div>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-8 drop-shadow-2xl hover:bg-white/10 transition-colors duration-200">
            <h3 className="text-2xl text-cyan-300 font-bold mb-4 border-b border-cyan-300 pb-2">
              Postgraduate
            </h3>
            <ul className="space-y-3 text-lg text-gray-200 tracking-wide">
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Computer Applications</li>
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Hydraulics</li>
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Structural Engineering</li>
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Information Technology</li>
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Computer Networking</li>
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Internet Engineering</li>
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Automation & Robotics</li>
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Power Systems</li>
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Machine Design</li>
              <li className="hover:text-cyan-300 cursor-pointer">M.Tech in Production Systems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Visit Us ===== */}
      <section className="py-20 px-6">
        <h2 className="text-4xl text-cyan-400 font-semibold text-center mb-12">
          Plan a Visit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-8 drop-shadow-2xl text-center hover:bg-white/10 transition-colors duration-200">
            <h3 className="text-2xl text-cyan-300 font-semibold mb-4">South Campus</h3>
            <a
              href="https://goo.gl/maps/..."
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-white/20 transition-transform duration-500 hover:scale-105 mb-4"
            >
              <img
                src={MapSouth}
                alt="South Campus Map"
                className="w-full h-64 object-cover"
              />
            </a>
            <p className="text-gray-200 text-base">
              Mananthavadi Rd, Vidyaranyapura, Mysuru, Karnataka 570008
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-8 drop-shadow-2xl text-center hover:bg-white/10 transition-colors duration-200">
            <h3 className="text-2xl text-cyan-300 font-semibold mb-4">North Campus</h3>
            <a
              href="https://goo.gl/maps/..."
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-white/20 transition-transform duration-500 hover:scale-105 mb-4"
            >
              <img
                src={MapNorth}
                alt="North Campus Map"
                className="w-full h-64 object-cover"
              />
            </a>
            <p className="text-gray-200 text-base">
              No 50, Koorgalli Village, Hootagalli Industrial Area, Mysuru, Karnataka 570018
            </p>
          </div>
        </div>
      </section>

      {/* ===== Call-to-Action ===== */}
      <section className="py-20 px-6 flex justify-center">
        <button className="px-12 py-4 text-2xl font-bold rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-2xl hover:scale-105 hover:shadow-cyan-500/50 transition duration-300">
          Apply Now
        </button>
      </section>
    </div>
  )
}

export default College
