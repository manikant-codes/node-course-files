const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    priority: { type: String, enum: ["A", "B", "C", "D"], default: "D" },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", TodoSchema);
