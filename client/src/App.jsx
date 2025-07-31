// src/App.jsx
import { Outlet, Link } from "react-router";

const App = () => {
  return (
    <div>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
