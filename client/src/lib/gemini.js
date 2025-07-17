// client/src/lib/gemini.js
import axios from "axios";

export async function checkForSlang(text) {
  try {
    const res = await axios.post("http://localhost:5000/api/check-text", {
      text,
    });
    console.log("data from backend AI ", res.data.result);
    return res.data.result; // 'OK' or 'BLOCKED'
  } catch (err) {
    console.error("Backend AI check failed", err);
    return "ERROR";
  }
}
