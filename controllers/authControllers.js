const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json({ success: false, msg: "Name, email and password are required!" });
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, msg: "Email already exists!" });
  }

  const isFirstUser = (await User.countDocuments()) === 0;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: isFirstUser ? "admin" : "user",
  });

  const trimmedUser = { id: user._id, name: user.name, role: user.role };

  const token = jwt.sign(trimmedUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.status(200).json({ success: true, data: trimmedUser, token });
};

const login = (req, res, next) => {
  res.send("login asd");
};

const logout = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, msg: "No token provided!" });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded", decoded);

    res
      .status(200)
      .json({ success: true, msg: "Logged out successfully!", decoded });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { signup, login, logout };
