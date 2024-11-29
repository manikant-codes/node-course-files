const mongoose = require("mongoose");

const connectToDB = () => {
  return mongoose.connect(process.env.MONGO_URL);
};

module.exports = connectToDB;
