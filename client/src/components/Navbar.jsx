import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
const navigate = useNavigate();

  const { backendUrl, isLoggedin, userData, setIsLoggedin, setUserData } =
    useContext(AppContent);

    const sendVerificationOtp = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp", {
          email: userData?.email,
        });
        if (data.success) {
          navigate('/email-verify')
          toast.success("Verification email sent!");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    // Clear states + local storage if you store token
    setIsLoggedin(false);
    setUserData(null);
    localStorage.removeItem("token");
    setDropdownOpen(false);
  };

  // First letter of name
  const avatarLetter = userData?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="navbar bg-gray-900 dark:bg-gray-100 shadow-lg px-6 sticky top-0 z-50 transition-colors duration-300">
      {/* Left side - Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          Mer Auth
        </Link>
      </div>

      {/* Right side - Buttons */}
      <div className="flex-none flex items-center gap-4 relative">
        {/* Dark/Light Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800 hover:scale-110 transition-transform"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* If not logged in → Show Login */}
        {!isLoggedin ? (
          <Link to="/login">
            <button className="btn rounded-full px-6 bg-purple-600 hover:bg-purple-700 border-none text-white shadow-md transition-all">
              Login
            </button>
          </Link>
        ) : (
          // If logged in → Show Avatar
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-800 font-bold">
                {avatarLetter}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={sendVerificationOtp}
                >
                  Verify email
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
