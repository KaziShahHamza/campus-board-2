// routes/authRoutes.js
import express from "express";
import { signup, login, getProfile } from "../controllers/authController.js"; 
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Protected route for dashboard/profile
router.get("/profile", verifyToken, getProfile);

export default router;
