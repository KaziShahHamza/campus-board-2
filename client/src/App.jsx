import { Routes, Route, Navigate } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostDetails from "./components/Post/PostDetails";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/posts/:id" element={<PostDetails />} />
    </Routes>
  );
};

export default App;
