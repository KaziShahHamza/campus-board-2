const express = require("express");
const { createComment, getCommentsByPost } = require("../controllers/commentController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", protect, createComment);
router.get("/:postId", getCommentsByPost);

module.exports = router;
