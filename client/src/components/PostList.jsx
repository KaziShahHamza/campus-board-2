import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import useAuth from "../context/useAuth";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";

function PostList({ posts, onAddComment, onVote, onToggleSolved }) {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 font-poppins">
        All Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
        {posts.map((post) => (
          <div
            key={post._id}
            className={`border rounded-lg p-4 mb-4 w-[300px] shadow-md font-nunito ${
              post.isSolved ? "bg-green-100 border-green-400" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold ">
              {post.title}{" "}
              {post.isSolved && (
                <span className="text-green-600 text-sm ml-2">[Solved]</span>
              )}
            </h3>
            <p className="text-gray-700">{post.description}</p>
            <small className="text-gray-500 block mt-1">
               Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </small>

            <div className="flex items-center mt-2 space-x-2">
              <div className="tooltip">
                <button
                  onClick={() => user && onVote(post._id, "up")}
                  disabled={!user}
                  className={`px-2 py-1 rounded ${
                    !user
                      ? "opacity-50 cursor-not-allowed"
                      : post.userVote === "up"
                      ? "bg-primary text-white"
                      : "hover:bg-primary-soft"
                  }`}
                >
                  👍
                </button>
                {!user && <span className="tooltiptext">Login to vote</span>}
              </div>
              <span>{post.upvotes || 0}</span>

              <div className="tooltip">
                <button
                  onClick={() => user && onVote(post._id, "down")}
                  disabled={!user}
                  className={`px-2 py-1 rounded ${
                    !user
                      ? "opacity-50 cursor-not-allowed"
                      : post.userVote === "down"
                      ? "bg-accent text-white"
                      : "hover:bg-primary-soft"
                  }`}
                >
                  👎
                </button>
                {!user && <span className="tooltiptext">Login to vote</span>}
              </div>
              <span>{post.downvotes || 0}</span>

              {user && (
                <button
                  onClick={() => onToggleSolved(post._id)}
                  className="ml-auto text-sm text-sky-500 hover:underline"
                  title="Toggle solved status"
                >
                  {post.isSolved ? "Mark Unsolved" : "Mark Solved"}
                </button>
              )}
            </div>

            <CommentList comments={post.comments || []} />
            {user ? (
              <CommentForm postId={post._id} onAddComment={onAddComment} />
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                <Link to="/login" className="text-sky-500">
                  Login{" "}
                </Link>
                to comment.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
