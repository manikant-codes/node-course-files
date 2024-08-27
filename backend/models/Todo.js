const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 2 },
  isCompleted: { type: Boolean, default: false },
  priority: { type: String, enum: ["A", "B", "C", "D"], default: "D" },
  date: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
  dueDate: {
    type: Date,
  },
});

const Todo = mongoose.model("Task", todoSchema);

module.exports = Todo;
