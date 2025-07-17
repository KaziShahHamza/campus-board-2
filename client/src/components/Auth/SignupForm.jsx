import { useState } from "react";
import { signup } from "../../api/authApi";
import { useNavigate } from "react-router";

export default function SignupForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" />
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
      <button type="submit">Signup</button>
    </form>
  );
}
