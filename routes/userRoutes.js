const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userControllers");
const {
  permissionMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, permissionMiddleware(["admin"]), getAllUsers);
router.get("/showMe", authMiddleware, showCurrentUser);
router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", authMiddleware, updateUserPassword);
router.get("/:id", getSingleUser);

module.exports = router;
