const express = require("express");
const { register, login, logout } = require("../controllers/authControllers");
const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/logout", logout);

module.exports = authRouter;
