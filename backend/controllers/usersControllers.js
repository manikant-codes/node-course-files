const User = require("../models/User");
const { getBasicContollers } = require("../utils/controllersUtils");
const userValidator = require("../validators/usersValidators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ExpiredToken = require("../models/ExpiredToken");

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

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const user = await User.create(req.body);

    res.status(200).json({ success: true, msg: "Sign-up successful!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
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
      email: req.body.email
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email!"
      });
    }

    const isPasswordSame = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordSame) {
      return res.status(400).json({
        success: false,
        msg: "Invalid password!"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "60s"
      }
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const signOut = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "No such user exists!"
      });
    }

    await ExpiredToken.create({ token: req.token });

    res.status(200).json({ success: true, msg: "Sign-out successful!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const checkUser = async (req, res) => {
  try {
    res.status(200).json({ success: true, msg: "Token is valid!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  checkUser
};
