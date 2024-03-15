const jwt = require("jsonwebtoken");

const getToken = (trimmedUser) => {
  return jwt.sign(trimmedUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = { getToken };
