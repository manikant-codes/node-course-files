const express = require("express");
const router = express.Router();

router.get("/logout", (req, res, next) => {
  res.send("logout asd");
});

router.post("/login", (req, res, next) => {
  res.send("login asd");
});

router.post("/signup", (req, res, next) => {
  res.send("signup asd");
});

module.exports = router;
