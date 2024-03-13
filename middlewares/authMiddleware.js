const jwt = require("jsonwebtoken");
const CustomError = require("../services/customError");

const authMiddleware = (req, res, next) => {
  // let token = req.headers.authorization;
  const token = req.signedCookies.token;

  // if (!token || !token.startsWith("Bearer ")) {
  //   throw new CustomError("Token not provided!", 401);
  // }

  if (!token) {
    throw new CustomError("Token not provided!", 401);
  }

  // token = token.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = { id: decoded.id, name: decoded.name, role: decoded.role };

  next();
};

const permissionMiddleware = (permittedRoles = []) => {
  return (req, res, next) => {
    console.log("req.user", req.user);
    if (!permittedRoles.includes(req.user.role)) {
      throw new CustomError("Access denied!", 403);
    }
    next();
  };
};

module.exports = { authMiddleware, permissionMiddleware };
