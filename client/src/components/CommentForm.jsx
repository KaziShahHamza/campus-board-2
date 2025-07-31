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
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 font-nunito"
      />
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded font-poppins transition"
      >
        Post Comment
      </button>
    </form>
  );
}

export default CommentForm;
