const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: String,
  body: String,
	date: { type: Date, default: Date.now }
});

const dreamSchema = new mongoose.Schema({
  author: String,
  authorUsername: String,
  title: String,
  body: String,
  comments: [commentSchema],
  date: { type: Date, default: Date.now },
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dream" }]
});

const Dream = mongoose.model("Dream", dreamSchema);
module.exports = Dream;
