const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getSingleUser);
// This needs to be before .patch(/:id, updateUser).
router.patch("/updatePassword", authMiddleware, updateUserPassword);
router.patch("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
