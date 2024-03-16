const User = require("../models/User");
const { getToken } = require("../utils/jwtHelper");
const getTrimmedUser = require("../utils/userHelper");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  const { user } = req;

  const users = await User.find({});
  res.status(200).json({ success: true, data: users });
};

const getSingleUser = async (req, res, next) => {
  const { user } = req;
  res.status(200).json({ success: true, data: user });
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  const newUserData = {};

  if (name) {
    if (!name?.trim()) {
      return res
        .status(400)
        .json({ success: false, msg: "Name cannot be empty!" });
    }
    newUserData.name = name;
  }

  if (email) {
    if (!email?.trim()) {
      return res
        .status(400)
        .json({ success: false, msg: "Email cannot be empty!" });
    }

    newUserData.email = email;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "Email alreay exists!" });
    }
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: user.id },
    newUserData,
    { returnOriginal: false }
  );

  const trimmedUser = getTrimmedUser(updatedUser);

  const token = getToken(trimmedUser);

  res.status(200).json({ success: true, data: trimmedUser, token });
};

const updateUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { user } = req;

  const existingUserPassword = await User.findOne({ _id: user.id }).select(
    "password"
  );

  const isValidOldPassowrd = bcrypt.compareSync(
    oldPassword,
    existingUserPassword.password
  );

  if (!isValidOldPassowrd) {
    return res
      .status(400)
      .json({ success: false, msg: "Old password didn't match!" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  await User.findByIdAndUpdate(user.id, { password: hashedPassword });

  res.status(200).send({
    success: true,
    msg: "Password updated successfully!",
  });
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res
    .status(200)
    .json({ success: true, data: null, msg: "User deleted successfully!" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
