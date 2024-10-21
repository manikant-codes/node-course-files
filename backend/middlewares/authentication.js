const jwt = require("jsonwebtoken");
const ExpiredToken = require("../models/ExpiredToken");

const authenticate = async (req, res, next, isAdminOnly) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        invalidToken: true,
        msg: "No token provided!"
      });
    }

    token = token.split(" ")[1];

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const alreadyExpired = await ExpiredToken.findOne({ token });

    if (alreadyExpired) {
      return res
        .status(401)
        .json({ success: false, invalidToken: true, msg: "Token expired!" });
    }

    if (isAdminOnly && user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized to access this route!" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.log(error.message);
    res
      .status(401)
      .json({ success: false, invalidToken: true, msg: error.message });
  }
};

const authenticateAdmin = (req, res, next) => {
  authenticate(req, res, next, true);
};

const authenticateUser = (req, res, next) => {
  authenticate(req, res, next, false);
};

module.exports = { authenticateAdmin, authenticateUser };
