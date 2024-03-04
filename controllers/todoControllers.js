const Todo = require("../models/Todo");
const CustomError = require("../services/customError");
const asyncWrapper = require("../utils/asyncWrapper");

const getAllTodos = asyncWrapper(async function (req, res) {
  const query = req.query;
  const queryObject = {};

  console.log("req.user", req.user);

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

  queryObject.userID = req.user._id;

  let result = Todo.find(queryObject);

  if (query.fields) {
    result = result.select(query.fields.replaceAll(",", " "));
  }

  if (query.sort) {
    result = result.sort(query.sort.replaceAll(",", " "));
  }

  const skip = (Number(query.page) - 1) * Number(query.limit) || 0;
  const limit = Number(query.limit) || 10;
  result = result.skip(skip).limit(limit);

  result = await result;

  res.status(200).json({ success: true, data: result });
});

const getTodo = asyncWrapper(async function (req, res, next) {
  const { id } = req.params;
  const result = await Todo.findById(id);
  if (!result) {
    next(new CustomError("No such todo found!", 404));
  }
  res.status(200).json({ success: true, data: result });
});

const addTodo = asyncWrapper(async function (req, res) {
  const result = await Todo.create({ ...req.body, userID: req.user._id });
  res.status(201).json({ success: true, data: result });
});

const updateTodo = asyncWrapper(async function (req, res) {
  const { id } = req.params;
  const result = await Todo.findByIdAndUpdate(id, req.body, {
    returnOriginal: false,
  });

  if (!result) {
    next(new CustomError("No such todo found!", 404));
  }

  res.status(200).json({ success: true, data: result });
});

const deleteTodo = asyncWrapper(async function (req, res) {
  const { id } = req.params;
  const result = await Todo.findByIdAndDelete(id);
  if (!result) {
    next(new CustomError("No such todo found!", 404));
  }
  res.status(200).json({ success: true, data: null });
});

module.exports = {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
