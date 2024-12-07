const mongoose = require("mongoose");
const express = require("express");

const server = express();

// Schema
const userSchema = new mongoose.Schema({
  fname: { type: String, minLength: 2, maxLength: 20, required: true },
  lname: { type: String, minLength: 2, maxLength: 20, required: true },
  email: {
    type: String,
    validate: {
      validator: (value) => {
        const emailRegex =
          /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
        const isCorrect = emailRegex.test(value);

        return isCorrect;
      },
      message: "Invalid email."
    },
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  height: { type: Number, requried: true, min: 4, max: 7 }
});

// Model
const User = mongoose.model("user", userSchema);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Successfully connected to the database.");
    server.listen(5000, () => {
      console.log("Server is listening on port 5000.");
    });
  } catch (error) {
    console.log("Failed connection to the database.");
  }
};

start();

// const createUser = async () => {
//   try {
//     const user = await User.create({
//       fname: "Manikant",
//       lname: "Jha",
//       email: "manikant1@gmail.com",
//       height: 5
//     });
//     console.log("User created successfully.", user);
//   } catch (error) {
//     console.log("Failed to create user.", error.message);
//   }
// };

// const getAllUsers = async () => {
//   try {
//     const users = await User.findOne({ email: "manikan@gmail.com" });
//     console.log(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const updateUser = async () => {
//   try {
//     const users = await User.findOneAndUpdate(
//       { email: "manikant1@gmail.com" },
//       {
//         fname: "Hemant",
//         lname: "Goud",
//         email: "hemant@gmail.com"
//       },
//       {
//         new: true
//       }
//     );
//     console.log(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const deleteUser = async () => {
  try {
    const users = await User.findOneAndDelete({ email: "hemant@gmail.com" });
    console.log(users);
  } catch (error) {
    console.log(error.message);
  }
};

deleteUser();
