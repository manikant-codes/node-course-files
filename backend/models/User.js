const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: {
    type: String,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
