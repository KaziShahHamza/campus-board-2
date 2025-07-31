// src/components/CommentList.js

function CommentList({ comments }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>Comments</h4>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div key={c._id} style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            <p>{c.content}</p>
            <small>{c.createdAt}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentList;
