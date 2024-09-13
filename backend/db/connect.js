const mongoose = require("mongoose");

const connectToDB = () => {
  return mongoose.connect(process.env.MONGO_URL_II);
};

module.exports = connectToDB;
