// src/components/PostForm.js
import React, { useState } from "react";
import { checkForSlang } from "../lib/gemini";

function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const fullText = `${title} ${description}`;
    const check = await checkForSlang(fullText);

    if (check === "BLOCKED") {
      setError("Post contains inappropriate language. Please revise.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toLocaleString(),
    };

    onAddPost(newPost);
    setTitle("");
    setDescription("");
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
