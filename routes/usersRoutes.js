const express = require("express");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/", addUser);

userRouter.patch("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
