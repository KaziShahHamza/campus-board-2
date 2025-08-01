// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
