import Post from "../models/Post.js";
import { checkForSlang } from "../utils/geminiCheck.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("comments"); // this loads comments

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to load posts" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required." });

    if (!description)
      return res.status(400).json({ error: "Description is required." });

    const fullText = `${title} ${description}`;
    const check = await checkForSlang(fullText);

    if (check === "BLOCKED") {
      return res
        .status(400)
        .json({ error: "Post contains inappropriate language" });
    }

    const newPost = new Post({ title, description });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("❌ Error saving post:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
