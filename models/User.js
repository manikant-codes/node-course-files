const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 200,
  },
  department: {
    type: String,
    enum: ["sale", "admin", "worker", "hr", "account"],
    default: "worker",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
