import { useState } from "react";
import { useNavigate } from "react-router";

const PostProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

      setTitle("");
      setDescription("");
      navigate("/");
    } catch (err) {
      setError("Failed to submit post");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-app px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primary mb-4 font-poppins">
        Share a Problem
      </h1>
      <p className="text-accent text-center max-w-md mb-6 font-nunito">
        Have an issue on campus? Post it here to let others know and join the
        conversation!
      </p>
      <form
        onSubmit={handleSubmit}
        className="surface border-muted p-6 rounded-xl card w-full max-w-md space-y-4"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Problem Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-muted rounded focus:outline-none focus:ring-2 font-poppins"
        />

        <textarea
          placeholder="Describe the problem..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          className="w-full p-3 border border-muted rounded focus:outline-none focus:ring-2 font-poppins"
        />

        <button
          type="submit"
          className="w-full py-2 bg-primary-soft hover:bg-primary text-primary font-bold rounded font-nunito transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostProblem;
