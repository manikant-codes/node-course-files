const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect("URL");

async function run() {
  const user = await User.create({ name: "Manikant" });
  //   user.name = "John";
  //   user.save();
  // const user = new User({ name: "Manikant", city: "Surat" });
  //   console.log(user);
  User.findById("id");
  User.find({ _id: "id" });
  User.find({ _id: "id" });
  User.exists({ _id: "id" });
  User.updateOne({ _id: "id" });
  User.deleteOne({ _id: "id" });
  User.where("name").equals("Manikant");
  User.where("age")
    .gt(12)
    .lt(31)
    .where("name")
    .equals("Manikant")
    .limit(2)
    .select("age")
    .populate("bestFriend");
}

run();
