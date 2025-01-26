const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
  getAdmin
} = require("../controllers/authControllers");
const {
  authMiddleware,
  adminAuthMiddleware
} = require("../middlewares/authMiddlewares");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", authMiddleware, logout);
authRouter.get("/getUser", authMiddleware, getUser);
authRouter.get("/getAdmin", adminAuthMiddleware, getUser);

module.exports = authRouter;
