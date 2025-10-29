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
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-primary font-poppins text-lg">
        Loading your dashboard...
      </div>
    );

  return (
  <div className="min-h-screen bg-app flex flex-col items-center px-4 py-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-primary mb-2 font-poppins">
        Welcome, {user.username} 👋
      </h1>
      <p className="text-accent mb-8 font-nunito text-center">
        Here’s your personalized CampusBoard dashboard
      </p>

      {/* Profile Card */}
      <div className="surface border-muted shadow-lg rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-soft text-primary rounded-full flex items-center justify-center text-2xl font-bold">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary font-poppins">
              {user.username}
            </h2>
            <p className="text-gray-700 font-nunito">{user.email}</p>
          </div>
        </div>

        <hr className="my-5 border-muted" />

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/complainboard")}
            className="py-2 bg-primary-soft hover:bg-primary rounded font-nunito font-semibold transition"
          >
            Complaints
          </button>
          <button
            onClick={() => navigate("/eventsboard")}
            className="py-2 bg-primary-soft hover:bg-primary rounded font-nunito font-semibold transition"
          >
            Events
          </button>
          <button
            onClick={() => navigate("/requestboard")}
            className="py-2 bg-primary-soft hover:bg-primary rounded font-nunito font-semibold transition"
          >
            Requests
          </button>
          <button
            onClick={() => navigate("/chats")}
            className="py-2 bg-primary-soft hover:bg-primary rounded font-nunito font-semibold transition"
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
