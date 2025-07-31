import { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

// src/pages/Home.js
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("❌ Error fetching posts:", err.message);
      }
    };

    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const addComment = (postId, newComment) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId
        ? { ...post, comments: [...(post.comments || []), newComment] }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleVote = (postId, type) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          upvotes: type === "up" ? (post.upvotes || 0) + 1 : post.upvotes || 0,
          downvotes:
            type === "down" ? (post.downvotes || 0) + 1 : post.downvotes || 0,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const toggleSolved = (postId) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, isSolved: !post.isSolved } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="p-6 font-poppins bg-[#f9f9ff] min-h-screen">
      <h1 className="text-3xl font-bold text-[#00bcd4] mb-6">
        Campus Problem Board
      </h1>
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
