const jwt = require("jsonwebtoken");

const authenticate = (req, res, next, isAdminOnly) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, msg: "No token provided!" });
    }

    token = token.split(" ")[1];

    console.log("token", token);

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (isAdminOnly && user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized to access this route!" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, msg: "Invalid token!" });
  }
};

const authenticateAdmin = (req, res, next) => {
  authenticate(req, res, next, true);
};

const authenticateUser = (req, res, next) => {
  authenticate(req, res, next, false);
};

module.exports = { authenticateAdmin, authenticateUser };
