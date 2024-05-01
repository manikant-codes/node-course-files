const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect("URL");

async function run() {
  const user = await User.create({ name: "Manikant" });
  //   user.name = "John";
  //   user.save();
  // const user = new User({ name: "Manikant", city: "Surat" });
  //   console.log(user);
}

run();
