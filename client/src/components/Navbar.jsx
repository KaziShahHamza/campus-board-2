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
      <Link to="/" className="hover:text-[#ffeb3b] text-3xl">
        CampusBoard
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-[#ffeb3b] text-xl">
          Home
        </Link>
        <Link to="/complain-board" className="hover:text-[#ffeb3b] text-xl">
          Complain Board
        </Link>
        <Link to="/request-board" className="hover:text-[#ffeb3b] text-xl">
          Request Board
        </Link>
        <Link to="/events-board" className="hover:text-[#ffeb3b] text-xl">
          Events Board
        </Link>
        <Link to="/chats" className="hover:text-[#ffeb3b] text-xl">
          Chats
        </Link>
        {isLoggedIn && (
          <Link
            to="/dashboard"
            className="bg-white text-[#7e57c2] px-3 py-2 rounded hover:bg-[#00bcd4] hover:text-white transition"
          >
            Dashboard
          </Link>
        )}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-[#ffeb3b] text-black px-3 py-1 rounded hover:bg-white transition cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-white text-[#7e57c2] px-3 py-2 rounded hover:bg-[#00bcd4] hover:text-white transition"
          >
            Login/SignUp
          </Link>
        )}
        <Link
          to="/post"
          className="bg-white text-[#7e57c2] px-3 py-2 rounded hover:bg-[#00bcd4] hover:text-white transition"
        >
          Let's solve it, Post here
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
