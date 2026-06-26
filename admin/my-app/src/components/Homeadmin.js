import React, { useEffect, useContext, useState } from "react";
import Notecontext from "../context/notes/NotesContext";
import { Link } from "react-router-dom";

const GovernmentAdminDashboard = () => {
  // State management
  const [candidates, setCandidates] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCandidate, setEditCandidate] = useState({
    id: '',
    name: '',
    party: ''
  });
  const [votingDuration, setVotingDuration] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const a = useContext(Notecontext);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('token1');
    if (!token) {
      window.location.href = '/';
      return;
    }

    // Set session expiry
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 2); // 2-hour session
    setSessionExpiry(expiryTime);

    // Auto logout after session expiry
    const timeout = setTimeout(() => {
      handleLogout();
    }, 2 * 60 * 60 * 1000); // 2 hours

    return () => clearTimeout(timeout);
  }, []);

  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await fetch(
        "http://localhost:5000/api/notes/fetchallcandidate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token1: localStorage.getItem("token1"),
          },
        },
       
      );
      const json = await response.json();
      setCandidates(json);
    };
    fetchCandidates();
  }, []);


  const onchange = (e) => {
    setEditCandidate({...editCandidate, [e.target.name]: e.target.value });
  };

  // Handlers
  const handleEdit = (candidate) => {
    setEditCandidate({
      id: candidate._id,
      name: candidate.name,
      party: candidate.party
    });
    console.log(editCandidate);
    setEditMode(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await a.updatecandidate(editCandidate.id, editCandidate.name, editCandidate.party);
    window.location.reload();
  };

  const handleSetVotingDuration = (e) => {
    e.preventDefault();
    const duration = parseInt(votingDuration);
    if (isNaN(duration) || duration <= 0) {
      alert('Please enter a valid duration in minutes');
      return;
    }
    setTimeout(() => {
      setShowResults(true);
    }, duration * 60 * 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token1');
    window.location.href = '/';
  };
  const handleDelete=(candidate)=>{
    a.deletecandidate(candidate._id);
    window.location.reload();
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white p-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/iii.png" 
              alt="Government Seal" 
              className="h-14 w-12 mr-4"
            />
            <h1 className="text-2xl font-bold">Election Administration Portal</h1>
          </div>
          <div className="flex items-center">
            <p className="mr-4">Session expires: {sessionExpiry?.toLocaleTimeString()}</p>
            <Link
            to="/addcandidate"
            className="text-white px-4 py-2 rounded bg-green-600 rounded hover:bg-green-700 mr-5"
          >
            Add Candidate
          </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Edit Modal */}
        {editMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit Candidate</h2>
              <form className="container my-4">
                <div className="mb-3">
                  <label htmlFor="title" className="text-black text-3xl font-semibold mb-6">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={onchange}
                    value={editCandidate.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="party" className="text-black text-3xl font-semibold mb-6">
                    party
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="party"
                    name="party"
                    onChange={onchange}
                    value={editCandidate.party}
                  />
                </div>
                <div className="modal-footer mx-4">
                    <button
                      type="button"
                      className="btn btn-secondary mx-2"
                      onClick={() => setEditMode(false)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdate}
                    >
                      Update Candidate
                    </button>
                  </div>
              </form> 
            </div>
          </div>
        )}

        {/* Candidates List */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Registered Candidates</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Party</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate._id} className="hover:bg-gray-50">
                    <td className="border p-2">{candidate.name}</td>
                    <td className="border p-2">{candidate.party}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleEdit(candidate)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(candidate)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 mx-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Voting Duration Control */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Voting Duration Control</h2>
            <form onSubmit={handleSetVotingDuration}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Set Voting Duration (minutes)
                </label>
                <input
                  type="number"
                  value={votingDuration}
                  onChange={(e) => setVotingDuration(e.target.value)}
                  className="w-full p-2 border rounded"
                  min="1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Set Duration
              </button>
            </form>
          </section>

          {/* Results Section */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Election Results</h2>
            {showResults ? (
              <a
                href="/results"
                className="block w-full bg-green-600 text-white text-center px-4 py-2 rounded hover:bg-green-700"
              >
                View Results
              </a>
            ) : (
              <p className="text-gray-600">
                Results will be available after the voting duration ends
              </p>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Government Election Commission. All rights reserved.</p>
          <p className="text-sm mt-2">Official Government Portal</p>
        </div>
      </footer>
    </div>
  );
};

export default GovernmentAdminDashboard;