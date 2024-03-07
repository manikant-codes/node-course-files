const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const authMiddleWare = require("../middlewares/authMiddleware");

router.get("/", authMiddleWare, getAllTodos);
router.get("/:id", authMiddleWare, getTodo);
router.post("/", authMiddleWare, addTodo);
router.put("/:id", authMiddleWare, updateTodo);
router.delete("/:id", authMiddleWare, deleteTodo);

module.exports = router;
