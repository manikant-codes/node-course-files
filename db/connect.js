const mongoose = require("mongoose");

async function connect() {
  return await mongoose.connect(
    "mongodb+srv://manikant:gkeDxDfuZieZGEbq@cluster0.x1avrmy.mongodb.net/?retryWrites=true&w=majority&appName=todos"
  );
}

module.exports = connect;
