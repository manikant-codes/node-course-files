const Todo = require("../models/Todo");

function getAllTodos(req, res) {
  res.send("Get All Todos");
}

function getSingleTodo(req, res) {
  res.send("Get Single Todo");
}

function addTodo(req, res) {
  res.send("Add Todo");
}

function updateTodo(req, res) {
  res.send("Update Todo");
}

function deleteTodo(req, res) {
  res.send("Delete Todo");
}

module.exports = {
  getAllTodos,
  getSingleTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
