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
  Todo.findById(req.params.id)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
}

async function addTodo(req, res) {
  Todo.create(req.body)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
}

function updateTodo(req, res) {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: "No such task found." });
      }
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
}

function deleteTodo(req, res) {
  Todo.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: "No such task found." });
      }
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
}

module.exports = {
  getAllTodos,
  getSingleTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
