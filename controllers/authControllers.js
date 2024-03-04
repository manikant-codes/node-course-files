const CustomError = require("../services/customError");
const asyncWrapper = require("../utils/asyncWrapper");
const User = require("../models/User");
const { signJWT } = require("../utils/jwtHelper");

const singup = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return next(new CustomError("Missing email, name or password!", 400));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new CustomError("Email already exists!", 400));
  }

  const isFirstUser = (await User.countDocuments({})) === 0;

  const role = isFirstUser ? "admin" : "user";

  const result = await User.create({ name, email, password, role });
  const user = { id: result._id, name: result.name };

  const token = signJWT(user);

  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email?.trim() || !password?.trim()) {
    return next(new CustomError("Missing email or password!", 400));
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return next(new CustomError("No such user found!", 400));
  }

  if (existingUser.password !== password) {
    return next(new CustomError("Incorrect password!", 400));
  }

  const user = { id: existingUser._id, name: existingUser.name };
  const token = signJWT(user);

  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});

const logout = asyncWrapper(async (req, res, next) => {
  res.status(200).json({ success: true, msg: "Logged out successfully!" });
});

module.exports = { singup, login, logout };
