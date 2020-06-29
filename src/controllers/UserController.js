const User = require("../models/User");
const utils = require("../utils/utils");

const register = async (req, res) => {
	const { username, email, password } = req.body;
	const encryptedPassword = await utils.encryptString(password);

	const existingUser = await User.findOne().or([{ username }, { email }]);
	if (existingUser) {
		return res.status(400).json({ error: "userExists" });
	}

	const user = await User.create({
		username,
		email,
		password: encryptedPassword
	});

	const token = await utils.generateJWT({ id: user.id, username, email });

	res.json({
		token,
		user: { id: user.id, username: user.username, email: user.username }
	});
};

const login = async (req, res) => {
	try {
		const { name, password } = req.body;
		const user = await User.findOne().or([{ username: name }, { email: name }]);

		if (!user) {
			return res.status(400).json({ error: "userNotFound" });
		}

		const isPasswordCorrect = await utils.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "incorrectPassword" });
		}

		const token = await utils.generateJWT({
			id: user.id,
			username: user.username,
			email: user.email
		});

		res.json({
			token,
			user: { id: user.id, username: user.username, email: user.email }
		});
	} catch (e) {
		res.status(500).json({ error: `${e}` });
	}
};

module.exports = { register, login };
