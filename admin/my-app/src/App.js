import Navbar from "./components/Navbar";
import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import About from "./components/About";
import NoteState from './context/notes/NoteState';
import Main from "./components/Main";
import './App.css';
import Admin from "./components/Admin";
import Homeadmin from "./components/Homeadmin";
import Signupadmin from "./components/Signupadmin";
import Addcandidate from "./components/Addcandidate";
import Footer from "./components/Footer";
import Footer2 from "./components/Footer2";
import Results from "./components/Results";

function App() {
  document.body.style.background="linear-gradient(#E2EAF4,#E2EAF4,white)";
  document.body.style.backgroundRepeat='no-repeat';
  localStorage.removeItem("token");
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
      path: "/about",
      element: (
        <>
          <Navbar showalert={showalert} handleonClick2={handleonClick2} />
          <LoadingBar color="#000" progress={progress} />
          <About/><Footer/>
        </>
      ),
    },
    {
      path: "/results",
      element: (
        <>
          <Navbar showalert={showalert} handleonClick2={handleonClick2} />
          <LoadingBar color="#000" progress={progress} />
          <Results/><Footer2/>
        </>
      ),
    },
    {
      path: "/admin",
      element: (
        <>
          
          <LoadingBar color="#000" progress={progress} />
          <Admin showalert={showalert} handleonClick2={handleonClick2}/>
        </>
      ),
    },
    {
      path: "/signupadmin",
      element: (
        <>
          
          <LoadingBar color="#000" progress={progress} />
          <Signupadmin showalert={showalert} handleonClick2={handleonClick2}/>
        </>
      ),
    },
    {
      path: "/homeadmin",
      element: (
        <>
          
          <LoadingBar color="#000" progress={progress} />
          <Homeadmin showalert={showalert} handleonClick2={handleonClick2}/>
        </>
      ),
    },
    {
      path: "/addcandidate",
      element: (
        <>
          
          <LoadingBar color="#000" progress={progress} />
          <Addcandidate showalert={showalert} handleonClick2={handleonClick2}/>
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
  )
}
export default App;
