// src/components/PostForm.js
import { useState } from "react";

function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      onAddPost(data);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Failed to submit post");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
      />
      <textarea
        placeholder="Post description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;
