const {
  sendErrorResponse,
  sendSuccessResponse,
  sendDataResponse
} = require("../helpers/resHelper");
const ExpiredToken = require("../models/ExpiredToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname.trim() || !lname.trim() || !email.trim() || !password.trim()) {
      return sendErrorResponse(res, "All fields are required.", 400);
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return sendErrorResponse(res, "Invalid email address.", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendErrorResponse(res, "User already exists.", 400);
    }

    if (password.length < 6) {
      return sendErrorResponse(
        res,
        "Password must be at least 6 characters.",
        400
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fname,
      lname,
      email,
      password: hashedPassword
    });

    sendSuccessResponse(res, "User registered successfully.", 201, user);
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
      return sendErrorResponse(res, "Invalid user name or password.", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return sendErrorResponse(res, "Invalid user name or password.", 404);
    }

    const fullName = user.fname + " " + user.lname;

    const token = jwt.sign(
      { id: user._id, fullName, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    sendDataResponse(res, {
      token,
      user: { id: user._id, fullName, email: user.email, role: user.role }
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const logout = async (req, res) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return sendErrorResponse(res, "Unauthorized", 401);
    }

    const token = req.headers.authorization.split(" ")[1];

    const alreadyExpiredToken = await ExpiredToken.findOne({ token });

    if (alreadyExpiredToken) {
      return sendErrorResponse(res, "Token expired.", 400);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await ExpiredToken.create({ token });

    sendSuccessResponse(res, "User logged out successfully.");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = { register, login, logout };
