// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },

  // New fields:
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  status: {
    type: String,
    enum: ["unsolved", "solved"],
    default: "unsolved",
  }

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
