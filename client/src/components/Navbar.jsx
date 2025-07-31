// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
  <nav className="bg-[#7e57c2] text-white px-6 py-4 flex justify-between items-center font-poppins">
    <div className="space-x-4">
      <Link to="/" className="hover:text-[#ffeb3b]">Home</Link>
      <Link to="/chats" className="hover:text-[#ffeb3b]">Chats</Link>
      <Link to="/complain-board" className="hover:text-[#ffeb3b]">Complain Board</Link>
      <Link to="/request-board" className="hover:text-[#ffeb3b]">Request Board</Link>
      <Link to="/events-board" className="hover:text-[#ffeb3b]">Events Board</Link>
      {isLoggedIn && (
        <Link to="/dashboard" className="hover:text-[#ffeb3b]">Dashboard</Link>
      )}
    </div>
    <div>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-[#ffeb3b] text-black px-3 py-1 rounded hover:bg-white transition"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-white text-[#7e57c2] px-3 py-1 rounded hover:bg-[#00bcd4] hover:text-white transition"
        >
          Login/SignUp
        </Link>
      )}
    </div>
  </nav>

  );
};

export default Navbar;
