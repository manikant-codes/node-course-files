const Todo = require("../models/Todo");

const getAllTodos = async (req, res) => {
  try {
    const query = req.query;
    const queryObject = {};

    if (query.isCompleted) {
      if (query.isCompleted === "true") {
        queryObject.isCompleted = true;
      } else {
        queryObject.isCompleted = false;
      }
    }

    if (query.task) {
      queryObject.text = { $regex: query.task, $options: "i" };
    }

    if (query.priority) {
      queryObject.priority = query.priority;
    }

    let result = Todo.find(queryObject);

    if (query.fields) {
      result = result.select(query.fields.replaceAll(",", " "));
    }

    const skip = (Number(query.page) - 1) * Number(query.limit) || 0;
    const limit = Number(query.limit) || 10;
    result = result.skip(skip).limit(limit);

    result = await result;

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
