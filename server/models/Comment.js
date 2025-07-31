// models/Comment.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
