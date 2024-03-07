const User = require("../models/User");
const CustomError = require("../services/customError");
const asyncWrapper = require("../utils/asyncWrapper");
const jwt = require("jsonwebtoken");

const signup = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new CustomError("Name, email and password are required!", 400));
  }

  const isFirstUser = (await User.countDocuments({})) === 0;

  const role = isFirstUser ? "admin" : "user";

  const result = await User.create({ name, email, password, role });

  const user = { id: result._id, name: result.name, role: result.role };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.status(200).json({ suceess: true, data: user, token });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Email and password are required!", 400));
  }

  const exisitingUser = await User.findOne({ email });

  if (!exisitingUser) {
    return next(new CustomError("No such user exists!", 404));
  }

  if (password !== exisitingUser.password) {
    return next(new CustomError("Passwords do not match!", 403));
  }

  const user = {
    id: exisitingUser._id,
    name: exisitingUser.name,
    role: exisitingUser.role,
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.status(200).json({ sucess: true, data: user, token });
});

const logout = asyncWrapper(async (req, res, next) => {
  res.status(200).json({ success: true, msg: "Logged out successfully!" });
});

module.exports = { signup, login, logout };
