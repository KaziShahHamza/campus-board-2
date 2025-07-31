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
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> | <Link to="/chats">Chats</Link> |{" "}
      <Link to="/complain-board">Complain Board</Link> |{" "}
      <Link to="/request-board">Request Board</Link> |{" "}
      <Link to="/events-board">Events Board</Link> |{" "}
      {isLoggedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link> |{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login/SignUp</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
