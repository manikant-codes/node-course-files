const CustomError = require("../services/customError");
const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    throw new CustomError("No valid token provided!", 401);
  }

  token = token.split("Bearer ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;

  next();
};
module.exports = authMiddleWare;
