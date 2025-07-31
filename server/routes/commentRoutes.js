import express from "express";
import { createComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/add", createComment);

export default router;
