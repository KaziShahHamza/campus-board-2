// src/App.jsx
import { Outlet, Link } from "react-router";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};


export default App;
