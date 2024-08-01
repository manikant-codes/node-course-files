const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "All Users" });
});

usersRouter.post("/", (req, res) => {
  res.status(200).json({ msg: "User Added" });
});

usersRouter.patch("/", (req, res) => {
  res.status(200).json({ msg: "User Updated" });
});

usersRouter.delete("/", (req, res) => {
  res.status(200).json({ msg: "User Deleted" });
});

module.exports = usersRouter;
