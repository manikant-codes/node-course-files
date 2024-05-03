const Task = require("../models/Task");

// Task.findById();
// Task.findOne();
// Task.findByIdAndUpdate();
// Task.findOneAndUpdate();
// Task.findByIdAndDelete();
// Task.findOneAndDelete();

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Failed to fetch tasks!" });
  }
};

const getSingleTask = (req, res) => {
  res.send("To-Do with ID: " + req.params.id);
};

const addTask = async (req, res) => {
  try {
    const { task, isCompleted, priority, dueDate } = req.body;
    // const task = new Task();
    // task.task = req.body.task;
    // task.isCompleted = req.body.isCompleted;
    // task.priority = req.body.priority;
    // task.dueDate = req.body.dueDate;
    // await task.save();
    await Task.create({ task, isCompleted, priority, dueDate });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ success: false, msg: "Failed to add task!" });
  }
};

const updateTask = (req, res) => {
  res.send("Updated Todo with ID: " + req.params.id);
};

const deleteTask = (req, res) => {
  res.send("Deleted Todo with ID: " + req.params.id);
};

module.exports = {
  getAllTasks,
  getSingleTask,
  addTask,
  updateTask,
  deleteTask,
};
