const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
