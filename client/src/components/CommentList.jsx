// src/components/CommentList.js

function CommentList({ comments }) {
  return (
    <div className="mt-4">
      <h4 className="text-lg font-bold text-yellow-600 font-poppins">
        Comments
      </h4>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div
            key={c._id}
            className="mb-2 p-2 bg-white border-l-4 border-sky-400 rounded font-nunito text-sm"
          >
            <p>{c.content}</p>
            <small className="text-gray-500">{c.createdAt}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentList;
