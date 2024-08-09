const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);
userRouter.post("/", addUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
