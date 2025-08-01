// controllers/commentController.js
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { checkForSlang } from "../utils/geminiCheck.js";

export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    const check = await checkForSlang(content);
    if (check === "BLOCKED") {
      return res.status(400).json({ error: "Comment contains inappropriate language" });
    }

    const comment = new Comment({ content, post: postId });
    const savedComment = await comment.save();

    // Add comment to Post
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (err) {
    console.error("❌ Error saving comment:", err.message);
    res.status(500).json({ error: "Failed to save comment" });
  }
};
