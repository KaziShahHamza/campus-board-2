import { useEffect, useState } from "react";
import { getPosts, createPost } from "../api/postApi";
import { useNavigate } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const { data } = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    await createPost(form);
    setForm({ title: "", body: "" });
    fetchPosts();
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleCreatePost}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <button type="submit">Post</button>
      </form>

      <hr />

      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>By: {post.author?.username}</p>
            <p>Status: {post.status}</p>
            <p>Upvotes: {post.upvotes.length} | Downvotes: {post.downvotes.length}</p>
            <button onClick={() => navigate(`/posts/${post._id}`)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
