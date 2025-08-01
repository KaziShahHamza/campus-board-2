import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import useAuth from "../context/useAuth";
import { Link } from "react-router";

function PostList({ posts, onAddComment, onVote, onToggleSolved }) {
  const { user } = useAuth(); // ✅ Check login

  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-600 mb-4 font-poppins">
        All Posts
      </h2>
      {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
      {posts.map((post) => (
        <div
          key={post._id}
          className={`border rounded-lg p-4 mb-4 w-[300px] shadow-md font-nunito ${
            post.isSolved ? "bg-green-100 border-green-400" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold text-purple-700">
            {post.title}{" "}
            {post.isSolved && (
              <span className="text-green-600 text-sm ml-2">[Solved]</span>
            )}
          </h3>
          <p className="text-gray-700">{post.description}</p>
          <small className="text-gray-500 block mt-1">
            Posted at: {post.createdAt}
          </small>

          <div className="flex items-center mt-2 space-x-2">
            <button
              onClick={() => user && onVote(post._id, "up")}
              disabled={!user}
              className={!user ? "opacity-50 cursor-not-allowed" : ""}
              title={!user ? "Login to vote" : ""}
            >
              👍
            </button>
            <span>{post.upvotes || 0}</span>

            <button
              onClick={() => user && onVote(post._id, "down")}
              disabled={!user}
              className={!user ? "opacity-50 cursor-not-allowed" : ""}
              title={!user ? "Login to vote" : ""}
            >
              👎
            </button>
            <span>{post.downvotes || 0}</span>

            <button
              onClick={() => user && onToggleSolved(post._id)}
              disabled={!user}
              className={`ml-auto text-sm text-sky-500 hover:underline ${
                !user ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title={!user ? "Login to toggle" : ""}
            >
              {post.isSolved ? "Mark Unsolved" : "Mark Solved"}
            </button>
          </div>

          <CommentList comments={post.comments || []} />
          {user ? (
            <CommentForm postId={post._id} onAddComment={onAddComment} />
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              <Link to="/login" className="text-sky-500">Login </Link>
              to comment.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
