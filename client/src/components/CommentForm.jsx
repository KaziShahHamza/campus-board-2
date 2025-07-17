// src/components/CommentForm.js
import React, { useState } from "react";
import { checkForSlang } from "../lib/gemini";

function CommentForm({ postId, onAddComment }) {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const check = await checkForSlang(commentText);
    if (check === "BLOCKED") {
      setError("Comment contains inappropriate language.");
      return;
    }

    const newComment = {
      id: Date.now(),
      content: commentText,
      createdAt: new Date().toLocaleString(),
    };

    onAddComment(postId, newComment);
    setCommentText("");
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
    </form>
  );
}

export default CommentForm;
