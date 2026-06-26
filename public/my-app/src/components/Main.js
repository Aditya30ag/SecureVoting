import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Vote, ChevronRight } from "lucide-react";

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-12 h-12 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Official e-Voting Portal</h1>
        </div>

        {/* Main Content */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Exercise Your Democratic Right
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Welcome to the secure and official electronic voting platform. 
              Participate in the democratic process with confidence.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center mb-4">
                  <Vote className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Voting</h3>
                <p className="text-gray-600">End-to-end encryption and verification of your vote</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Identity Protection</h3>
                <p className="text-gray-600">Advanced security measures to protect your information</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center mb-4">
                  <Vote className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy Access</h3>
                <p className="text-gray-600">Simple and accessible voting process for all citizens</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleGetStarted}
              className="group inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Official Government e-Voting Platform | Secured & Monitored by Election Commission
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}