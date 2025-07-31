// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !username || !password)
    return res.status(400).json({ error: "All fields required" });

  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const newUser = await User.create({ username, email, password });

    res.status(201).json({ message: "Signup successful." });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};


export const getProfile = async (req, res) => {
  try {
    // req.user.id is populated by the verifyToken middleware
    const user = await User.findById(req.user.id).select("-password"); 

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to load profile" });
  }
};