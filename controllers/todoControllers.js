const Todo = require("../models/Todo");

const getAllTodos = async (req, res) => {
  try {
    const result = await Todo.find({});
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findById(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, msg: "No such todo found!" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const result = await Todo.create(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndUpdate(id, req.body, {
      returnOriginal: false,
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, msg: "No such todo found!" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, msg: "No such todo found!" });
    }
    res.status(200).json({ success: true, data: null });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
