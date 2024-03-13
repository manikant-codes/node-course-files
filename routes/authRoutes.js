const express = require("express");
const { singup, login, logout } = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", singup);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);

module.exports = router;
