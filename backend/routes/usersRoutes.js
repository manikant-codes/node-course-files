const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
} = require("../controllers/usersControllers");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("/", addUser);
usersRouter.patch("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
