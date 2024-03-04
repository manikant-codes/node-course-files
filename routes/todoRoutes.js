const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getAllTodos);
router.get("/:id", authMiddleware, getTodo);
router.post("/", authMiddleware, addTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;
