const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  signUp,
  signIn,
  signOut,
  checkUser,
  verifyEmail
} = require("../controllers/usersControllers");
const {
  authenticateUser,
  authenticateAdmin
} = require("../middlewares/authentication");

const usersRouter = express.Router();

usersRouter.post("/signin", signIn);
usersRouter.post("/signup", signUp);
usersRouter.get("/signout", authenticateUser, signOut);
usersRouter.get("/verifyEmail", verifyEmail);
usersRouter.get("/checkUser", authenticateUser, checkUser);
usersRouter.get("/", authenticateAdmin, getAllUsers);
usersRouter.get("/:id", authenticateUser, getUser);
usersRouter.patch("/:id", authenticateUser, updateUser);
usersRouter.delete("/:id", authenticateAdmin, deleteUser);

module.exports = usersRouter;
