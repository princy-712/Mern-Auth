import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {AppContent } from '../context/AppContext'; // ✅ make sure you have this file

// SVG Icon components for better UI
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

function LoginPage() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  // State to hold form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('Sign Up'); // 'Sign Up' or 'Log In'

  // Error / Success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      axios.defaults.withCredentials = true;

      if (authMode === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          setSuccess('Account created successfully!');
          navigate('/');
        } else {
          setError(data.message || 'Something went wrong');
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });

        if (data.success) {
          setIsLoggedin(true);
           await getUserData();
          setSuccess('Logged in successfully!');
          navigate('/');
        } else {
          setError(data.message || 'Invalid credentials');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Server error');
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-700">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">{authMode === 'Sign Up' ? 'Create Account' : 'Log In'}</h1>
            <p className="text-gray-400">{authMode === 'Sign Up' ? 'Join us and start your journey.' : 'Welcome back!'}</p>
          </div>

          {/* Display success or error messages */}
          {error && <div className="bg-red-500 bg-opacity-20 text-red-300 p-3 rounded-lg text-sm text-center">{error}</div>}
          {success && <div className="bg-green-500 bg-opacity-20 text-green-300 p-3 rounded-lg text-sm text-center">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {authMode === 'Sign Up' && (
              <div className="relative">
                <div className="absolute top-1/2 left-3 -translate-y-1/2">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <MailIcon />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              />
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <LockIcon />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              />
            </div>
            <a href="/reset-password" className="text-indigo-400 hover:text-indigo-300 transition duration-300">
              Forgot Password?
            </a>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              {authMode === 'Sign Up' ? 'Create Account' : 'Log In'}
            </button>
          </form>

          <div className="text-center text-gray-400 text-sm">
            <p>
              {authMode === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setAuthMode(authMode === 'Sign Up' ? 'Log In' : 'Sign Up')}
                className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-300"
              >
                {authMode === 'Sign Up' ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
