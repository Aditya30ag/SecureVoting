import React, { useState } from "react";
import { createBrowserRouter, Navigate,RouterProvider } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Content from "./components/Content";
import Signup from "./components/Signup";

import NoteState from './context/notes/NoteState';

import Main from "./components/Main";
import './App.css';

import Otp from "./components/Otp";


function App() {
  document.body.style.background="linear-gradient(#E2EAF4,#E2EAF4,white)";
  document.body.style.backgroundRepeat='no-repeat';
  const [progress, setprogress] = useState(0);
  const showalert = () => {
    setTimeout(() => {
      setprogress(20);
    }, 100);
    setTimeout(() => {
      setprogress(40);
    }, 200);
    setTimeout(() => {
      setprogress(60);
    }, 300);
    setTimeout(() => {
      setprogress(80);
    }, 400);
    setTimeout(() => {
      setprogress(100);
    }, 500);
  };
  const handleonClick2 = () => {
    showalert();
  };


  
  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Redirect to main page if no token exists
      return Navigate;
    }
    
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <LoadingBar color="#000" progress={progress} />
          <Main/>

        </>
      ),
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <>
            <LoadingBar color="#000" progress={progress} />
            <Content handleonClick2={handleonClick2}/>
          </>
        </ProtectedRoute>
      ),
    },
    // ... other routes remain same
    {
      path: "/otp",
      element: (
        <>
          <LoadingBar color="#000" progress={progress} />
          <Otp showalert={showalert}/>
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <LoadingBar color="#000" progress={progress} />
          <Signup showalert={showalert} handleonClick2={handleonClick2} />
        </>
      ),
    },
  ]);

  return (
    <>
      <NoteState>
        <RouterProvider router={router}/>
      </NoteState>
    </>
  );
}

export default App;

