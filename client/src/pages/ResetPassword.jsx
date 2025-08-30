import React, { useContext,  useState } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

const { backendUrl} = useContext(AppContent)
  axios.defaults.withCredentials = true

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [otp, setOtp] = useState(0);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    const pasteValues = pasteData.split("").slice(0, 6);
    pasteValues.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = char;
      }
    });
    const nextIndex = pasteValues.length < 6 ? pasteValues.length : 5;
    inputRefs.current[nextIndex]?.focus();
  };

   // Step 1 - Submit Email
  const onSubmitEmail = async (e) => {
    e.preventDefault(); 
    try {
     
      const {data} = await axios.post(backendUrl +'/api/auth/send-reset-otp', { email });

      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true);   
    } catch (error) {
      toast.error(error.message);
    }
  }


const onSubmitOTP = async (e) => { e.preventDefault(); const otpArray = inputRefs.current.map((e) => e.value); const enteredOtp = otpArray.join(""); try { const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email, otp: enteredOtp, newPassword, }); if (data.success) { toast.success(data.message); setOtp(enteredOtp); setIsOtpSubmited(true); } else { toast.error(data.message || "Invalid OTP"); } } catch (error) { toast.error(error.response?.data?.message || error.message); } };


const onSubmitNewPassword = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(
      backendUrl + "/api/auth/reset-password",
      {
        email,
        otp,        // include otp that user entered
        newPassword
      }
    );

    if (data.success) {
      toast.success(data.message);
      navigate("/");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-200 to-purple-400">


      {/* enter email id */}

      {!isEmailSent && 

      <form onSubmit={onSubmitEmail} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Reset Password
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your registered email.
        </p>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email id"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Reset Password
        </button>
      </form>
}
      {/* enter otp */}
{!isOtpSubmited && isEmailSent &&
      <form onSubmit={onSubmitOTP} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Reset Password OTP
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Please enter the 6-digit code sent to your email.
        </p>
        <div className="flex justify-between mb-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                required
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onPaste={handlePaste}
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              />
            ))}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition-colors"
        >
          Verify
        </button>
      </form>
      }

      {/* enter new password */}
      {isOtpSubmited && isEmailSent &&
      <form onSubmit={onSubmitNewPassword} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          New Password
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your new password below.
        </p>
        <div className="mb-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Reset Password
        </button>
      </form>
      }
    </div>
  );
};

export default ResetPassword;
