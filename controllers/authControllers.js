const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getTrimmedUser = require("../utils/userHelper");
const { getToken } = require("../utils/jwtHelper");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json({ success: false, msg: "Name, email and password are required!" });
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, msg: "Email already exists!" });
  }

  const isFirstUser = (await User.countDocuments()) === 0;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: isFirstUser ? "admin" : "user",
  });

  const trimmedUser = getTrimmedUser(user);

  const token = getToken(trimmedUser);

  res.status(200).json({ success: true, data: trimmedUser, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json({ success: false, msg: "Email and password are required!" });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res
      .status(404)
      .json({ success: false, msg: "No such user exists!" });
  }

  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(401).json({ success: false, msg: "Invalid password!" });
  }

  const trimmedUser = getTrimmedUser(existingUser);

  const token = getToken(trimmedUser);

  res.status(200).json({ success: true, data: trimmedUser, token });
};

const logout = (req, res, next) => {
  try {
    console.log("req.user", req.user);
    res.status(200).json({ success: true, msg: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { signup, login, logout };
