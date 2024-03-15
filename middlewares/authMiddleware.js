const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, msg: "No token provided!" });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: "Invalid token!" });
  }
};

module.exports = authMiddleware;
