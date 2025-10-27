// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-[#7e57c2] font-poppins text-lg">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-[#7e57c2] mb-2 font-poppins">
        Welcome, {user.username} 👋
      </h1>
      <p className="text-[#00bcd4] mb-8 font-nunito text-center">
        Here’s your personalized CampusBoard dashboard
      </p>

      {/* Profile Card */}
      <div className="bg-purple-50 border border-[#7e57c2] shadow-lg rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-300 text-black rounded-full flex items-center justify-center text-2xl font-bold">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#7e57c2] font-poppins">
              {user.username}
            </h2>
            <p className="text-gray-700 font-nunito">{user.email}</p>
          </div>
        </div>

        <hr className="my-5 border-[#7e57c2]/30" />

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/complainboard")}
            className="py-2 bg-yellow-300 hover:bg-yellow-400 rounded font-nunito font-semibold transition"
          >
            Complaints
          </button>
          <button
            onClick={() => navigate("/eventsboard")}
            className="py-2 bg-sky-300 hover:bg-sky-400 rounded font-nunito font-semibold transition"
          >
            Events
          </button>
          <button
            onClick={() => navigate("/requestboard")}
            className="py-2 bg-green-300 hover:bg-green-400 rounded font-nunito font-semibold transition"
          >
            Requests
          </button>
          <button
            onClick={() => navigate("/chats")}
            className="py-2 bg-purple-300 hover:bg-purple-400 rounded font-nunito font-semibold transition"
          >
            Chats
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="mt-8 text-red-500 hover:text-red-600 font-semibold transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
