const {
  sendErrorResponse,
  sendDataResponse,
  sendSuccessResponse
} = require("../helpers/resHelpers");
const ExpiredToken = require("../models/ExpiredToken");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    sendDataResponse(res, req.user, 200);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname.trim() || !lname.trim() || !email.trim() || !password.trim()) {
      return sendErrorResponse(res, "All fields are required.", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendErrorResponse(
        res,
        "User with this email already exists.",
        400
      );
    }

    if (password.length < 6) {
      return sendErrorResponse(
        res,
        "Password must be at least 6 characters long.",
        400
      );
    }

    const numberOfUsers = await User.countDocuments();
    const isAdmin = numberOfUsers === 0;

    await User.create({
      fname,
      lname,
      email,
      password,
      role: isAdmin ? "admin" : "user"
    });

    sendSuccessResponse(res, "User registered successfully.", 201);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      return sendErrorResponse(res, "All fields are required.", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return sendErrorResponse(res, "User not found.", 404);
    }

    if (user.password !== password) {
      return sendErrorResponse(res, "Invalid password.", 400);
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    sendDataResponse(
      res,
      {
        token,
        user: {
          id: user._id,
          fullName: user.fname + " " + user.lname,
          email: user.email,
          role: user.role
        }
      },
      200
    );
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await ExpiredToken.create({ token });
    sendSuccessResponse(res, "Logged out successfully.", 200);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser
};
