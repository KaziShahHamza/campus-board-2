// src/components/PostList.js
import React from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function PostList({ posts, onAddComment, onVote, onToggleSolved }) {
  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "1rem",
            padding: "1rem",
            width: "300px",
            backgroundColor: post.isSolved ? "#e0ffe0" : "#fff"
          }}
        >
          <h3>
            {post.title}{" "}
            {post.isSolved && (
              <span style={{ color: "green", fontSize: "0.8rem" }}>
                [Solved]
              </span>
            )}
          </h3>
          <p>{post.description}</p>
          <small>Posted at: {post.createdAt}</small>

          <div style={{ marginTop: "0.5rem" }}>
            <button onClick={() => onVote(post.id, "up")}>👍</button>
            <span style={{ margin: "0 0.5rem" }}>{post.upvotes || 0}</span>

            <button onClick={() => onVote(post.id, "down")}>👎</button>
            <span style={{ margin: "0 0.5rem" }}>{post.downvotes || 0}</span>

            <button
              onClick={() => onToggleSolved(post.id)}
              style={{ marginLeft: "1rem" }}
            >
              {post.isSolved ? "Mark Unsolved" : "Mark Solved"}
            </button>
          </div>

          <CommentList comments={post.comments || []} />
          <CommentForm postId={post.id} onAddComment={onAddComment} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
