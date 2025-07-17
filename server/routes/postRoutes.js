const express = require("express");
const { createPost, getAllPosts, toggleVote, toggleSolved } = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", getAllPosts);
router.post("/", protect, createPost);
router.put("/:id/vote", protect, toggleVote);
router.put("/:id/solved", protect, toggleSolved);

module.exports = router;
