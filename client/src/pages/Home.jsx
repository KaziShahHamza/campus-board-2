import React, { useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

// src/pages/Home.js
function Home() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const addComment = (postId, newComment) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...(post.comments || []), newComment] }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleVote = (postId, type) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          upvotes: type === "up" ? (post.upvotes || 0) + 1 : post.upvotes || 0,
          downvotes: type === "down" ? (post.downvotes || 0) + 1 : post.downvotes || 0,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const toggleSolved = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, isSolved: !post.isSolved } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Campus Problem Board</h1>
      <PostForm onAddPost={addPost} />
      <PostList
        posts={posts}
        onAddComment={addComment}
        onVote={handleVote}
        onToggleSolved={toggleSolved}
      />
    </div>
  );
}

export default Home;