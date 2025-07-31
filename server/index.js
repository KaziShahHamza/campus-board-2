// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connect.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
