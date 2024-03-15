const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  const { user } = req;

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, msg: "Not allowed to access this route!" });
  }

  const users = await User.find({});
  res.status(200).json({ success: true, data: users });
};
const getSingleUser = async (req, res, next) => {};
const updateUser = async (req, res, next) => {};
const updateUserPassword = async (req, res, next) => {};
const deleteUser = async (req, res, next) => {};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
