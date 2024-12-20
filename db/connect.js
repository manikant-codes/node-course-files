const mongoose = require("mongoose");

const connectToDB = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/products-CRUD");
};

module.exports = connectToDB;
