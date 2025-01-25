const express = require("express");
const {
  register,
  login,
  logout,
  getUser
} = require("../controllers/authControllers");
const { userAuthMiddleware } = require("../middlewares/authMiddleware");
const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/logout", userAuthMiddleware, logout);

authRouter.get("/getUser", userAuthMiddleware, getUser);

module.exports = authRouter;
