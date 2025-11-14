// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../context/useAuth";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-md rounded-xl p-8 font-nunito">
      <h2 className="text-2xl font-bold text-purple mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-purple"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-purple"
        />
        <button
          type="submit"
          className="w-full py-2 bg-primary-soft hover:bg-primary text-primary font-bold rounded font-nunito transition"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline font-medium">
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Login;
