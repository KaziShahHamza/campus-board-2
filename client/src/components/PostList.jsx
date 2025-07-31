// src/components/PostList.js
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function PostList({ posts, onAddComment, onVote, onToggleSolved }) {
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
            <button onClick={() => onVote(post._id, "up")}>👍</button>
            <span>{post.upvotes || 0}</span>
            <button onClick={() => onVote(post._id, "down")}>👎</button>
            <span>{post.downvotes || 0}</span>
            <button
              onClick={() => onToggleSolved(post._id)}
              className="ml-auto text-sm text-sky-500 hover:underline"
            >
              {post.isSolved ? "Mark Unsolved" : "Mark Solved"}
            </button>
          </div>

          <CommentList comments={post.comments || []} />
          <CommentForm postId={post._id} onAddComment={onAddComment} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
