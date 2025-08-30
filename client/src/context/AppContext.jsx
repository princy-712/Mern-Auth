// src/context/AppContext.jsx
import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/is-auth", {
        withCredentials: true,
      });

      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.userData); // ✅ save user details here
      } else {
        setIsLoggedin(false);
        setUserData(null);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoggedin(false);
      setUserData(null);
      toast.error(error.message);
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{children}</AppContent.Provider>
  );
};

export { AppContent };
