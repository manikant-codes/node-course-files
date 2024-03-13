const User = require("../models/User");
const CustomError = require("../services/customError");
const asyncWrapper = require("../utils/asyncWrapper");
const attachCookiesToResponse = require("../utils/cookiesHelper");

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(200).json({ success: true, data: users });
});

const getSingleUser = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    return res.status(404).json({ success: false, msg: "No such user found!" });
  }
  res.status(200).json({ success: true, data: user });
});

const showCurrentUser = asyncWrapper(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

const updateUser = asyncWrapper(async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return next(new CustomError("Email and name are required!", 400));
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { name, email },
    { runValidators: true, new: true }
  );

  const trimmedUser = { id: user.id, name: user.name, role: user.role };

  attachCookiesToResponse(trimmedUser);

  res.status(200).json({ success: true, data: trimmedUser });
});

const updateUserPassword = asyncWrapper(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new CustomError("Both fields are required!", 400));
  }

  const user = await User.findOne({ _id: req.user.id });

  if (!user) {
    return next(new CustomError("No such user found!", 404));
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    return next(new CustomError("Passwords did not match!", 401));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({ success: true, msg: "Update users password!" });
});

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
