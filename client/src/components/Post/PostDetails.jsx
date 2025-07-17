import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getPosts,
  votePost,
  toggleSolved,
} from "../../api/postApi";
import {
  addComment,
  getComments,
} from "../../api/commentApi";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchPostAndComments = async () => {
    const all = await getPosts();
    const found = all.data.find((p) => p._id === id);
    setPost(found);
    const { data: commentData } = await getComments(id);
    setComments(commentData);
  };

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  const handleVote = async (type) => {
    await votePost(id, type);
    fetchPostAndComments();
  };

  const handleToggleSolved = async () => {
    await toggleSolved(id);
    fetchPostAndComments();
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    await addComment(id, text);
    setText("");
    fetchPostAndComments();
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>By: {post.author?.username}</p>
      <p>Status: {post.status}</p>

      <button onClick={() => handleVote("upvote")}>⬆️ Upvote</button>
      <button onClick={() => handleVote("downvote")}>⬇️ Downvote</button>
      <button onClick={handleToggleSolved}>
        {post.status === "solved" ? "Mark Unsolved" : "Mark Solved"}
      </button>

      <p>
        Upvotes: {post.upvotes.length} | Downvotes: {post.downvotes.length}
      </p>

      <hr />

      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>

      <ul>
        {comments.map((c) => (
          <li key={c._id}>
            <p>{c.text}</p>
            <p>By: {c.author?.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
