// src/components/CommentForm.js
import React, { useState } from "react";

function CommentForm({ postId, onAddComment }) {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content: commentText }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add comment");
        return;
      }

      onAddComment(postId, data);
      setCommentText("");
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        style={{ width: "100%", marginTop: "0.5rem" }}
      />
      <button type="submit" style={{ padding: "0.3rem 1rem" }}>
        Post Comment
      </button>
    </form>
  );
}

export default CommentForm;
