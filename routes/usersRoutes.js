const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "All users" });
});

userRouter.post("/", (req, res) => {
  res.status(200).json({ msg: "User added" });
});

userRouter.patch("/", (req, res) => {
  res.status(200).json({ msg: "User updated" });
});

userRouter.delete("/", (req, res) => {
  res.status(200).json({ msg: "User deleted" });
});

module.exports = userRouter;
