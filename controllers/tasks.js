const Task = require("../models/Task");

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
    const { task, priority, dueDate } = req.body;
    // const task = new Task();
    // task.task = req.body.task;
    // task.isCompleted = req.body.isCompleted;
    // task.priority = req.body.priority;
    // task.dueDate = req.body.dueDate;
    // await task.save();
    const result = await Task.create({ task, priority, dueDate });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ success: false, msg: "Failed to add task!" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { task, isCompleted, priority, dueDate } = req.body;
    const { id } = req.params;

    // const existingTask = await Task.findById(id);
    const existingTask = await Task.findOne({ _id: id });

    if (!existingTask) {
      return res
        .status(404)
        .json({ success: false, msg: "No such task exists!" });
    }

    // const updatedTask = await Task.findByIdAndUpdate(
    //   id,
    //   {
    //     task,
    //     isCompleted,
    //     priority,
    //     dueDate,
    //   },
    //   {
    //     returnOriginal: false,
    //   }
    // );
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      {
        task,
        isCompleted,
        priority,
        dueDate,
      },
      {
        returnOriginal: false,
      }
    );
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ success: false, msg: "Failed to update task!" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // const existingTask = await Task.findById(id);
    const existingTask = await Task.findOne({ _id: id });

    if (!existingTask) {
      return res
        .status(404)
        .json({ success: false, msg: "No such task exists!" });
    }

    // const result = await Task.findByIdAndDelete(id);
    const deletedTask = await Task.findOneAndDelete({ _id: id });
    res.status(200).json({ success: true, data: null });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ success: false, msg: "Failed to delete task!" });
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  addTask,
  updateTask,
  deleteTask,
};
