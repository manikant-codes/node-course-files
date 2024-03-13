const express = require("express");
const { signup, login, logout } = require("../controllers/authControllers");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;
