const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
  } catch (error) {}
};

const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ msg: "User added!", data: user });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
