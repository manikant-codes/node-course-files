const Todo = require("../models/Todo");

function getAllTodos(req, res) {
  Todo.find()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
}

function getSingleTodo(req, res) {
  res.send("Get Single Todo");
}

async function addTodo(req, res) {
  try {
  } catch (error) {}
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
