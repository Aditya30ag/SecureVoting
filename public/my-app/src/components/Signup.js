import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, AlertCircle, Info } from "lucide-react";


export default function Signup(props) {
  const [credentials, setCredential] = useState({
    voterid: "",
    aadharNumber: "",
  });
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnClick = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voterid: credentials.voterid,
          aadharNumber: credentials.aadharNumber,
          
        }),
      });
      const json = await response.json();
      
      if (json.success === true) {
        localStorage.setItem("token", json.token);
        localStorage.setItem('otp', json.otp);
        navigate("/otp");
        props.showalert();
      } else {
        props.showalert();
        setContent(json.success1 === false ? json.error : json.error);
      }
    } catch (error) {
      setContent("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredential({ ...credentials, [e.target.name]: e.target.value });
  };



  return (
    <>
     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
     <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Voter Authentication
          </h2>
          <p className="mt-2 text-gray-600">
            Secure Electronic Voting System
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-lg p-8 border border-gray-100">
          {/* Security Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-blue-400 mr-2" />
              <p className="text-sm text-blue-700">
                Your credentials are encrypted and protected by government-grade security
              </p>
            </div>
          </div>

          <form onSubmit={handleOnClick} className="space-y-6">
            {/* Voter ID Field */}
            <div>
              <label 
                htmlFor="voterid" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Voter ID Number
              </label>
              <input
                type="text"
                id="voterid"
                name="voterid"
                value={credentials.voterid}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                placeholder="Enter your Voter ID"
              />
            </div>

            {/* Aadhar Number Field */}
            <div>
              <label 
                htmlFor="aadharNumber" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Aadhaar Number
              </label>
              <input
                type="password"
                id="aadharNumber"
                name="aadharNumber"
                value={credentials.aadharNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                placeholder="Enter your 12-digit Aadhaar number"
              />
            </div>

            {/* Error Message */}
            {content && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <p className="text-sm text-red-700">{content}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify & Continue"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Protected by Government of India Electronic Voting System</p>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}