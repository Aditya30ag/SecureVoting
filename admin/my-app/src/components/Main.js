import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/homeadmin");
    }
  }, [navigate]);

  const handleLogin = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Government Electronic Voting System
          </h1>
          <p className="text-gray-600">
            Secure Administrative Access Portal
          </p>
        </div>

        {/* Alert Section */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <p className="text-sm text-blue-800">
              This is a restricted access system for authorized government personnel only.
              Unauthorized access attempts will be logged and reported.
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Proceed to Secure Login
          </button>
          
          <p className="text-xs text-center text-gray-500">
            By accessing this system, you agree to comply with all applicable government 
            security policies and regulations.
          </p>
        </div>
      </div>
    </div>
  );
}