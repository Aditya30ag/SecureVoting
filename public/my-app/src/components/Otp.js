import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Building2, Camera, Lock, Shield, AlertCircle, KeyRound } from "lucide-react";
import axios from "axios";

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");  // Store user phone
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const BASE_URL = "http://localhost:5000";  // Change to your backend URL

  // Function to send OTP
  const sendOtp = async () => {
    if (!phone) {
      setError("Please enter your phone number");
      return;
    }
    console.log(phone);
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/otp/send-otp`, { phone });
      setSuccess(response.data.message);
    } catch (error) {
      setError("Failed to send OTP. Try again.");
    }
    setIsLoading(false);
  };

  // Handle OTP Input Change
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (error) setError("");
    
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace, Arrow Keys
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0 && otpRefs.current[index - 1]) {
        otpRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
      e.preventDefault();
    }
    else if (e.key === 'ArrowLeft' && index > 0) {
      otpRefs.current[index - 1].focus();
    }
    else if (e.key === 'ArrowRight' && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  // Verify OTP Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const submittedOtp = otp.join("");

      if (!submittedOtp || submittedOtp.length !== 6) {
        throw new Error("Please enter a complete 6-digit code");
      }
      
      const response = await axios.post(`${BASE_URL}/api/otp/verify-otp`, { phone, otp: submittedOtp });

      if (response.data.success) {
        setSuccess("Verification successful");
        localStorage.setItem("otpToken",response.data.otpToken);
        setTimeout(() => navigate('/home'), 1000);
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Building2 className="h-16 w-16 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Secure Banking Verification
          </h2>
          <p className="mt-2 text-gray-400">
            Enhanced Security Authentication System
          </p>
        </div>


        <div className="bg-gray-800 shadow-2xl rounded-xl p-8 mt-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <KeyRound className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Enter your phone number and receive an OTP for verification.
              </p>
            </div>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white mb-4"
            />

            <button
              type="button"
              onClick={sendOtp}
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>

            <div className="flex justify-center space-x-4 mt-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => otpRefs.current[idx] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-14 h-14 text-center text-xl font-semibold bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}
            {success && <p className="text-green-400 text-center">{success}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
