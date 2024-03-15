const express = require("express");
const { signup, login, logout } = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", authMiddleware, logout);

module.exports = router;
