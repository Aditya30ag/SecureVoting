import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token1");
    navigate("/");
    props.showalert();
    window.location.reload();
    props.handleonClick2();
  };

  const exit = async () => {
    props.handleonClick2();
    navigate(`${location.pathname}`);
  };

  return (
    <nav className={`bg-transparent z-10`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          className="text-xl font-bold text-black hover:text-blue-600"
          to="/"
          onClick={logout}
        >
          Voting App
        </Link>
        <button
          className="md:hidden p-2 text-black rounded focus:outline-none"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          // Add any additional functionality for the toggle button if necessary
        >
          <span className="block w-6 h-1 bg-black mb-1"></span>
          <span className="block w-6 h-1 bg-black mb-1"></span>
          <span className="block w-6 h-1 bg-black"></span>
        </button>
        <div className="hidden md:flex space-x-4" id="navbarSupportedContent">
          <ul className="flex space-x-4">
            <li>
              <div
                className={`cursor-pointer nav-link ${location.pathname === "/" ? "font-bold text-blue-600" : "text-black hover:text-blue-600"}`}
                onClick={exit}
                aria-current="page"
              >
                Home
              </div>
            </li>
            <li>
              <Link
                className={`nav-link ${location.pathname === "/about" ? "font-bold text-blue-600" : "text-black hover:text-blue-600"}`}
                onClick={props.handleonClick2}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
