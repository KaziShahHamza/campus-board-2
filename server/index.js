// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connect.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
// import geminiRoutes from "./routes/geminiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api", postRoutes);
app.use("/api/comments", commentRoutes);
// app.use("/api/gemini", geminiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
