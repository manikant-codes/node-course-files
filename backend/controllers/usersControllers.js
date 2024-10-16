const User = require("../models/User");
const { getBasicContollers } = require("../utils/controllersUtils");
const userValidator = require("../validators/usersValidators");
const jwt = require("jsonwebtoken");

const { getAllUsers, getUser, addUser, updateUser, deleteUser } =
  getBasicContollers("users", "user", User, "avatar", true, false);

const signUp = async (req, res) => {
  try {
    userValidator(req.body);

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, msg: "Email already exists!" });
    }

    const numberOfUsers = await User.countDocuments();

    if (numberOfUsers === 0) {
      req.body.role = "admin";
    }

    const user = await User.create(req.body);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    if (!req.body.email.trim() || !req.body.password.trim()) {
      return res
        .status(400)
        .json({ success: false, msg: "Email and password are required!" });
    }

    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email or password are required!"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const signOut = async (req, res) => {};

module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };
