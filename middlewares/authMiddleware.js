const jwt = require("jsonwebtoken");
const CustomError = require("../services/customError");

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return next(new CustomError("Token not provided!", 401));
  }

  token = token.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = { _id: decoded.id, name: decoded.name };

  next();
};

module.exports = authMiddleware;
