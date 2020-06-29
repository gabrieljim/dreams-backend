const Dream = require("../models/Dream");
const User = require("../models/User");
const utils = require("../utils/utils");

const checkCredentials = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res
			.status(401)
			.json({ error: { type: "auth", msg: "No token provided" } });
	}
	const token = req.headers.authorization.slice(7);
	const user = await utils.verifyJWT(token);

	if (user.error) {
		switch (user.error.name) {
			case "TokenExpiredError":
				res.status(401).json({ error: "Token expired" });
			default:
				return;
		}
	}
	res.locals.user = user;
	next();
};

const getDreams = async (req, res) => {
	const { page } = req.query;
	const dreams = await Dream.find()
		.sort({ date: -1 })
		.skip(page * 10)
		.limit(10);
	res.json({ dreams });
};

const getDream = async (req, res) => {
	const { dreamId } = req.query;

	const dream = await Dream.findById(dreamId);
	res.json({ dream });
};

const getUserDreams = async (req, res) => {
	const { page } = req.query;
	const { user } = req.params;
	const dreams = await Dream.find({ author: user })
		.sort({ date: -1 })
		.skip(page * 10)
		.limit(10);
	res.json({ dreams });
};

const createDream = async (req, res) => {
	try {
		const { id, username } = res.locals.user;
		const { title, body } = req.body;
		const newDream = await Dream.create({
			author: id,
			authorUsername: username,
			title,
			body
		});
		res.json({ newDream });
	} catch (e) {
		res.status(500).json({ error: `${e}` });
	}
};

const newComment = async (req, res) => {
	try {
		const { comment, dreamId } = req.body;
		const { user } = res.locals;

		const dream = await Dream.findById(dreamId);
		dream.comments.push({ author: user.username, body: comment });
		await dream.save();
		console.log(dream.comments);

		res.json({ newComment: dream.comments[dream.comments.length - 1] });
	} catch (e) {
		res.status(500).json({ error: `${e}` });
	}
};

const getLikeStatus = async (req, res) => {
	try {
		const id = res.locals.user.id;
		const { dreamId } = req.params;

		const user = await User.findById(id);

		if (user.liked.includes(dreamId)) {
			res.json({ isLiked: true });
		} else {
			res.json({ isLiked: false });
		}
	} catch (e) {
		res.status(500).json({ error: `${e}` });
	}
};

const likeDream = async (req, res) => {
	try {
		const { id } = res.locals.user;
		const { dreamId } = req.body;
		const { dislike } = req.query;

		if (dislike === "true") {
			dream = await Dream.updateOne(
				{ _id: dreamId },
				{ $pull: { likes: { $in: id } } }
			);
			await dream.save();

			res.json({ msg: "Dream liked" });
		} else {
			dream = await Dream.findById(dreamId);
			dream.likes.push(id);
			await dream.save();

			res.json({ msg: "Dream liked" });
		}
	} catch (e) {
		res.status(500).json({ error: `${e}` });
	}
};

/* 
	
	TODO: figure out the audio uploading

const uploadFile = async (req, res) => {
	return res.json(req.body);
	const storageRef = storage.ref();
	const dreamsRef = storageRef.child("dreams/test.json");
	const blob = new Blob([JSON.stringify({ test: "test uwuwuwu" })], {
		type: "application/json"
	});
	const response = await dreamsRef.put(blob);
	res.json({ response });
};
*/

module.exports = {
	getDreams,
	getDream,
	getUserDreams,
	createDream,
	newComment,
	getLikeStatus,
	likeDream,
	checkCredentials
};
