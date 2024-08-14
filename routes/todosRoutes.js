const express = require("express");
const {
  getAllTodos,
  getSingleTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosControllers");
const todosRouter = express.Router();

todosRouter.get("/", getAllTodos);

todosRouter.get("/:id", getSingleTodo);

todosRouter.post("/", addTodo);

todosRouter.patch("/:id", updateTodo);

todosRouter.delete("/:id", deleteTodo);

module.exports = todosRouter;
