const env = require("../env.js");

const generateJWT = async payload => {
  const jwt = require("jsonwebtoken");
  const token = jwt.sign(payload, env.SECRET);
  return token;
};

const verifyJWT = async token => {
  const jwt = require("jsonwebtoken");
  try {
    return jwt.verify(token, env.SECRET);
  } catch (e) {
    return { error: e };
  }
};

const encryptString = async string => {
  const bcrypt = require("bcryptjs");
  const saltRounds = 6;
  const encryptedString = await bcrypt.hash(string, saltRounds);
  return encryptedString;
};

const compare = async (string, hash) => {
  const bcrypt = require("bcryptjs");
  return await bcrypt.compare(string, hash);
};

module.exports = { generateJWT, verifyJWT, encryptString, compare };
