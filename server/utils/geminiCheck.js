// utils/geminiCheck.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.MY_SECRET);
// console.log(process.env.GEMINI_API_KEY);

if (process.env.GEMINI_API_KEY) {
  console.log(
    "GEMINI_API_KEY found"
  );
} else {
  console.log("No GEMINI_API_KEY found");
}

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // can be omitted if GEMINI_API_KEY is in .env
});

export async function checkForSlang(text) {
  const prompt = `
    You are a content moderation AI for a university discussion board. Users post in Bangla, English, or Banglish. Your job is to decide whether the post contains disrespectful, offensive, or slang language.

      ✅ Allow:
      - Negative feedback about teachers, departments, or the university (e.g., "Our department is not good", "Teachers are not helpful", "The system is broken").
      - Harassment or abuse reports, even if they mention sexual terms.
      - Posts with criticism or complaints, as long as there are no slang/insults.

      ❌ Reject:
      - Slang, swear words, or insults (e.g., "baler teacher", "fuck", "magi", "khanki", "sexy", "randi", "hot ma’am", "gandu", etc.)
      - Objectifying or sexual comments about women/teachers/students (e.g., “That girl is hot”, “Sexy teacher”)
      - Disrespectful personal attacks or sexually offensive jokes.

      Respond only with:
      - "OK" if the post is acceptable
      - "SLANG" if the post contains slang, insults

    Analyze this post:
    "${text}"
    `;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables "thinking" feature
        },
      },
    });

    const output = result.text?.trim() || "";

    if (output.toLowerCase().includes("slang")) return "BLOCKED";
    return "OK";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "ERROR 2";
  }
}
