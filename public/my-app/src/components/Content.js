import React, { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Noteitem from "./Noteitem";
import Notecontext from "../context/notes/NotesContext";
import { Shield, Camera, AlertCircle, CheckCircle2 } from "lucide-react";
import Webcam from "react-webcam";



export default function Content(props) {
  const a = useContext(Notecontext);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [newvalue, setNewvalue] = useState();
  const webcamRef = useRef(null);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      a.getNotes();
    } else {
      navigate("/");
    }
  }, [a, navigate]);

  const handleonclick = async (note) => {
    setNewvalue(note);
    await a.getuser();
    setDisable(true);
  };

  const handleonclick2 = async (e) => {
    e.preventDefault();
    console.log("a.user inside handleonclick2 is:", a.user);
    if (handleonclick) {
      if (!a.user || (!a.user._id && !a.user.id)) {
        alert("Session expired or invalid token. Please log out and log in again.");
        localStorage.removeItem("token");
        window.location.href = "/signup";
        return;
      }
      
      let photoUrl = null;
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          try {
            // Convert base64 to file
            const resBase64 = await fetch(imageSrc);
            const blob = await resBase64.blob();
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
            
            // Upload to MinIO
            const formData = new FormData();
            formData.append("photo", file);
            
            const uploadRes = await fetch("http://localhost:5000/api/auth/upload-photo", {
              method: "POST",
              headers: {
                token: localStorage.getItem("token")
              },
              body: formData
            });
            const uploadJson = await uploadRes.json();
            if (uploadJson.success) {
              photoUrl = uploadJson.photoUrl;
            } else {
              console.error("Upload failed:", uploadJson.error);
            }
          } catch (error) {
            console.error("Error uploading photo:", error);
          }
        }
      }

      const c = a.user._id || a.user.id;
      await newvalue.voteCount++;
      await a.updatecandidate(
        newvalue._id || newvalue.id,
        newvalue.name,
        newvalue.party,
        newvalue.voteCount
      );
      await a.updateuser(
        c,
        a.user.name,
        a.user.email,
        a.user.aadharNumber,
        a.user.isvoted,
        photoUrl
      );
      setDisable(false);
      localStorage.removeItem("token");
      localStorage.removeItem('eyeScans');
      localStorage.removeItem('currentEyeScan');
      window.location.reload();
      props.handleonClick2();
    }
  };

  // eslint-disable-next-line no-unused-vars
  const StatusMessage = ({ type, message }) => {
    if (!message) return null;
    
    const isError = type === "error";
    const bgColor = isError ? "bg-red-50" : "bg-green-50";
    const borderColor = isError ? "border-red-400" : "border-green-400";
    const textColor = isError ? "text-red-700" : "text-green-700";
    const Icon = isError ? AlertCircle : CheckCircle2;
    
    return (
      <div className={`${bgColor} border-l-4 ${borderColor} p-6 rounded-lg mt-6`}>
        <div className="flex items-center">
          <Icon className={`h-6 w-6 ${isError ? "text-red-400" : "text-green-400"} mr-3`} />
          <p className={`text-sm ${textColor} font-medium`}>{message}</p>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">
              Official E-Voting System
            </h1>
          </div>
          <p className="text-gray-600 text-xl">
            Election Commission of India - Secure Electronic Voting Portal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-12">


          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Select Your Candidate
              </h2>
              <p className="text-base text-gray-600">
                Click to select your preferred candidate
              </p>
            </div>
            <div className="space-y-6 max-h-[480px] overflow-y-auto pr-4">
              {a.notes.map((note) => (
                <div
                  key={note._id || note.id}
                  className="border rounded-xl hover:border-blue-500 transition-colors duration-200"
                >
                  <Noteitem
                    note={note}
                    name={note.name}
                    party={note.party}
                    handleonClick2={props.handleonClick2}
                    handleonclick={handleonclick}
                    disable={disable}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          {disable && (
            <div className="mb-6 flex flex-col items-center">
              <div className="flex items-center mb-3">
                <Camera className="w-5 h-5 text-gray-700 mr-2" />
                <p className="text-gray-700 font-medium">Please face the camera to verify your vote identity:</p>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={320}
                  height={240}
                  className="rounded-lg shadow-inner"
                />
              </div>
            </div>
          )}
          <button
            className={`px-10 py-4 rounded-xl font-semibold text-white transition-all duration-200 text-lg shadow-md hover:shadow-lg ${
              disable
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleonclick2}
            type="submit"
            disabled={!disable}
          >
            Submit Vote
          </button>
          {!disable && (
            <p className="text-base text-gray-600 mt-4">
              Please select a candidate to enable voting
            </p>
          )}
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p className="text-base">© 2024 Election Commission of India. All rights reserved.</p>
          <p className="text-base mt-2">Secure • Transparent • Democratic</p>
        </div>
      </div>
      
    </div>

    </>
  );
}