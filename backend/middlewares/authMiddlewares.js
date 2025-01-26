const { sendErrorResponse } = require("../helpers/resHelpers");
const ExpiredToken = require("../models/ExpiredToken");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return sendErrorResponse(res, "Unauthorized.", 401);
    }

    const token = req.headers.authorization.split(" ")[1];

    const alreadyExpired = await ExpiredToken.findOne({ token });

    if (alreadyExpired) {
      return sendErrorResponse(res, "Token already expired.", 400);
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    next();
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const adminAuthMiddleware = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return sendErrorResponse(res, "Unauthorized.", 401);
    }

    const token = req.headers.authorization.split(" ")[1];

    const alreadyExpired = await ExpiredToken.findOne({ token });

    if (alreadyExpired) {
      return sendErrorResponse(res, "Token already expired.", 400);
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user.role !== "admin") {
      return sendErrorResponse(res, "Unauthorized.", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = { authMiddleware, adminAuthMiddleware };
