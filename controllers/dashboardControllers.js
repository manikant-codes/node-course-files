const Todo = require("../models/Todo");
const asyncWrapper = require("../utils/asyncWrapper");

const getStats = asyncWrapper(async (req, res, next) => {
  const completedTasks = await Todo.countDocuments({
    isCompleted: true,
    userID: req.user._id,
  });
  const incompleteTasks = await Todo.countDocuments({
    isCompleted: false,
    userID: req.user._id,
  });
  const totalTasks = await Todo.countDocuments({
    userID: req.user._id,
  });

  res.status(200).json({
    success: true,
    data: { completedTasks, incompleteTasks, totalTasks },
  });
});

module.exports = { getStats };
