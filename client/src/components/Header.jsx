// src/components/Header.jsx
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { AppContent } from "../context/AppContext";
import React, { useContext } from "react";

const Header = () => {
  const { userData, isLoggedin } = useContext(AppContent);

  // Handle different cases safely
  const displayName = userData?.name || userData?.username || "Developer";

  return (
    <header className="relative w-full overflow-hidden bg-slate-900 text-white">
      {/* Background Glow Effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] sm:w-[120%] sm:h-[120%] md:w-full md:h-full bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-900 rounded-full blur-3xl opacity-50"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="container mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
            MERN Stack Authentication
          </h1>

          {/* Dynamic Greeting */}
          <h2 className="text-3xl font-extrabold">
            Hey {displayName} !!! 🖐
          </h2>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-300">
            Welcome to a full-stack application built with MongoDB, Express.js,
            React, and Node.js. This project provides a robust, secure, and
            scalable foundation for user authentication, including sign-up,
            sign-in, and protected routes.
          </p>

          {/* Tech Stack Pills */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 flex-wrap">
            <span className="bg-sky-500/10 text-sky-400 text-sm font-medium px-4 py-2 rounded-full">
              MongoDB
            </span>
            <span className="bg-slate-700/50 text-slate-300 text-sm font-medium px-4 py-2 rounded-full">
              Express.js
            </span>
            <span className="bg-cyan-400/10 text-cyan-300 text-sm font-medium px-4 py-2 rounded-full">
              React
            </span>
            <span className="bg-green-500/10 text-green-400 text-sm font-medium px-4 py-2 rounded-full">
              Node.js
            </span>
          </div>

          {/* CTA */}
          {!isLoggedin && (
          <div className="mt-10">
            <Link to="/login">
              <button
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                Get Started
              </button>
            </Link>
          </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
