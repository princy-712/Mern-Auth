import React, { useContext, useEffect } from 'react'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const EmailVerify = () => {
  
  const { backendUrl, getUserData , isLoggedin , userData } = useContext(AppContent)
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    const value = e.target.value
    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    } else if (value.length === 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text')
    const pasteValues = pasteData.split('').slice(0, 6)
    pasteValues.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = char
      }
    })
    const nextIndex = pasteValues.length < 6 ? pasteValues.length : 5
    inputRefs.current[nextIndex]?.focus()
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const otpArray = inputRefs.current.map((e) => e.value)
      const otp = otpArray.join('')
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })
      if (data.success) {
        toast.success(data.message)
        await getUserData()
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
useEffect(() => {
  isLoggedin && userData && userData.isAccountVerified && navigate('/')
}, [isLoggedin, userData, navigate])


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-200 to-purple-400">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Email Verify OTP
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
    </div>
  )
}

export default EmailVerify
