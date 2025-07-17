const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  const { postId, text } = req.body;
  const comment = await Comment.create({
    post: postId,
    author: req.user.id,
    text,
  });

  res.status(201).json(comment);
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId })
    .populate("author", "username")
    .sort({ createdAt: -1 });

  res.json(comments);
};
