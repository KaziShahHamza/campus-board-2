// routes/geminiRoutes.js
import express from "express";
import { checkForSlang } from "../utils/geminiCheck.js";

const router = express.Router();

router.post("/check-text", async (req, res) => {
  // console.log(process.env.MY_SECRET);
  // console.log(process.env.GEMINI_API_KEY);
  // console.log("entered check-text route");
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required." });

  const result = await checkForSlang(text);
  // console.log("content checked ", result);
  res.json({ result });
});




export default router;
