const CustomError = require("../services/customError");
const asyncWrapper = require("../utils/asyncWrapper");
const User = require("../models/User");
const attachCookiesToResponse = require("../utils/cookiesHelper");

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

  const result = await User.create({
    name,
    email,
    password,
    role,
  });

  const trimmedUser = { id: result.id, name: result.name, role: result.role };

  attachCookiesToResponse(res, trimmedUser);

  res.status(200).json({
    success: true,
    data: trimmedUser,
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return next(new CustomError("Missing email or password!", 400));
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return next(new CustomError("No such user found!", 400));
  }

  const isPasswordCorrect = await existingUser.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new CustomError("Incorrect password!", 400));
  }

  const trimmedUser = {
    id: existingUser.id,
    name: existingUser.name,
    role: existingUser.role,
  };

  attachCookiesToResponse(res, trimmedUser);

  res.status(200).json({
    success: true,
    data: trimmedUser,
  });
});

const logout = asyncWrapper(async (req, res, next) => {
  res.cookie("token", "logout", { expires: new Date(Date.now()) });
  res.status(200).json({ success: true, msg: "Logged out successfully!" });
});

module.exports = { singup, login, logout };
