const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "No such user found." });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ msg: "User added.", data: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "No such user found." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

    res.status(200).json({ msg: "User updated.", data: updatedUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "No such user found." });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ msg: "User deleted." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
