import { useState, useEffect } from "react";
import PostList from "../components/PostList";
import useAuth from "../context/useAuth";

// src/pages/Home.js
function Home() {
  const [posts, setPosts] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        const data = await res.json();

        // If user is logged in, hydrate posts with userVote from localStorage
        if (user) {
          const votesKey = `votes_${user._id || user.id || user.username}`;
          const stored = JSON.parse(localStorage.getItem(votesKey) || "{}");
          const hydrated = data.map((p) => ({
            ...p,
            userVote: stored[p._id] || null,
          }));
          setPosts(hydrated);
        } else {
          setPosts(data);
        }
      } catch (err) {
        console.error("❌ Error fetching posts:", err.message);
      }
    };

    fetchPosts();
  }, [user]);

  // const addPost = (newPost) => {
  //   setPosts([newPost, ...posts]);
  // };

  const addComment = (postId, newComment) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId
        ? { ...post, comments: [...(post.comments || []), newComment] }
        : post
    );
    setPosts(updatedPosts);
  };

  // Toggle voting: a user can upvote or downvote once. Clicking again removes the vote.
  const handleVote = (postId, type) => {
    if (!user) return;

    const votesKey = `votes_${user._id || user.id || user.username}`;
    const stored = JSON.parse(localStorage.getItem(votesKey) || "{}");
    const current = stored[postId] || null;

    const updatedPosts = posts.map((post) => {
      if (post._id !== postId) return post;

      let up = post.upvotes || 0;
      let down = post.downvotes || 0;
      let newUserVote = current;

      if (current === type) {
        // toggle off
        if (type === "up") up = Math.max(0, up - 1);
        else down = Math.max(0, down - 1);
        delete stored[postId];
        newUserVote = null;
      } else {
        // switching vote or adding new
        if (current === "up") up = Math.max(0, up - 1);
        if (current === "down") down = Math.max(0, down - 1);

        if (type === "up") up = up + 1;
        else down = down + 1;

        stored[postId] = type;
        newUserVote = type;
      }

      return { ...post, upvotes: up, downvotes: down, userVote: newUserVote };
    });

    localStorage.setItem(votesKey, JSON.stringify(stored));
    setPosts(updatedPosts);
  };

  const toggleSolved = (postId) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, isSolved: !post.isSolved } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="p-6 font-poppins bg-app min-h-screen">
      <h1 className="text-3xl font-bold text-accent mb-6">
        Campus Problem Board
      </h1>
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
