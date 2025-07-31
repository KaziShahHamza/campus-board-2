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
    <form onSubmit={handleSubmit} className="mb-4 space-y-2 w-[300px]">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="block w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 font-poppins"
      />
      <textarea
        placeholder="Post description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="block w-full p-2 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 font-poppins"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black rounded font-bold font-nunito transition"
      >
        Submit
      </button>
    </form>

  );
}

export default PostForm;
