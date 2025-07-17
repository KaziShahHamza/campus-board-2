const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, body } = req.body;
  const post = await Post.create({ title, body, author: req.user.id });
  res.status(201).json(post);
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 });
  res.json(posts);
};

exports.toggleVote = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // upvote or downvote
  const userId = req.user.id;

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.upvotes.pull(userId);
  post.downvotes.pull(userId);

  if (type === "upvote") post.upvotes.push(userId);
  if (type === "downvote") post.downvotes.push(userId);

  await post.save();
  res.json(post);
};

exports.toggleSolved = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (String(post.author) !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  post.status = post.status === "solved" ? "unsolved" : "solved";
  await post.save();
  res.json(post);
};
