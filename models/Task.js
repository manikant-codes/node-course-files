const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    trim: true,
  },
  isCompleted: { type: Boolean, default: false },
  priority: { type: String, enum: ["A", "B", "C", "D"], default: "D" },
  dueDate: String,
});

// const taskModel = mongoose.model("Task", taskSchema);
// module.exports = taskModel;

module.exports = mongoose.model("Task", taskSchema);
