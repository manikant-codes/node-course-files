const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  signUp,
  signIn,
  signOut
} = require("../controllers/usersControllers");

const usersRouter = express.Router();

usersRouter.post("/signin", signIn);
usersRouter.post("/signup", signUp);
usersRouter.get("/signout", signOut);
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUser);
usersRouter.patch("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
