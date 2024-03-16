const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} = require("../controllers/usersControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

router.get("/", authMiddleware, permissionMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getSingleUser);
// This needs to be before .patch(/:id, updateUser).
router.patch("/updatePassword", authMiddleware, updateUserPassword);
router.patch("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, permissionMiddleware, deleteUser);

module.exports = router;
