import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Admin(props) {
  const [credentials, setcredential] = useState({ email: "", password: "" });
  const [content, setcontent] = useState("");
  const navigate = useNavigate();

  const handleonClick = async (e) => {
    e.preventDefault();
    const password = document.querySelector("#exampleInputPassword1");
    
    const url = "http://localhost:5000/api/admin/loginadmin";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    
    const json = await response.json();
    console.log(json);
    
    if (json.success === true) {
      localStorage.setItem("token1", json.token1);
      navigate("/homeadmin");
      props.showalert();
    } else {
      props.showalert();
      if (json.success1 === false) {
        setcontent(json.error);
      }
      password.style.border = "1px solid red";
      setcontent(json.error);
    }
  };

  const onchange = async (e) => {
    await setcredential({ ...credentials, [e.target.name]: e.target.value });
    setcontent("");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
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
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Government Portal Login
          </h3>
          <p className="text-sm text-gray-600">
            Secure access for authorized government personnel only
          </p>
        </div>

        {/* Security Notice */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-3">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <p className="text-xs text-blue-800">
              This is a secure government system. All login attempts are monitored and recorded.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleonClick} className="space-y-5">
          <div>
            <label
              htmlFor="exampleInputEmail1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Government Admin ID
            </label>
            <input
              type="email"
              id="exampleInputEmail1"
              name="email"
              value={credentials.email}
              onChange={onchange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@gov.in"
            />
          </div>

          <div>
            <label
              htmlFor="exampleInputPassword1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onchange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your secure password"
            />
            {content && (
              <p className="text-red-600 text-sm mt-2 font-medium">
                {content}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Secure Login
            </button>
            <Link
              to="/signupadmin"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Request Access
            </Link>
          </div>
        </form>

        {/* Footer Notice */}
        <p className="mt-8 text-xs text-center text-gray-500">
          By logging in, you agree to comply with all applicable government security policies and regulations.
        </p>
      </div>
    </div>
  );
}