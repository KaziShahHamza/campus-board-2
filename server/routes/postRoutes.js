import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";

const router = express.Router();

router.get("/posts", getAllPosts);
router.post("/create", createPost);

export default router;
