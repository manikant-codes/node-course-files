const mongoose = require("mongoose");

const userScheam = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: {
    type: String,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  password: { type: String, required: true }
});

// userScheam.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// userScheam.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model("User", userScheam);

module.exports = User;
