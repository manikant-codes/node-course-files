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

  const user = { id: result._id, name: result.name };
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.status(200).json({ user, token });
});

const login = asyncWrapper(async (req, res, next) => {});

const logout = asyncWrapper(async (req, res, next) => {});

module.exports = { signup, login, logout };
