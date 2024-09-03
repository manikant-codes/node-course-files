const mongoose = require("mongoose");

function connectToDB() {
  const dbConnectionPromise = mongoose.connect(
    "mongodb://localhost:27017/yashvi"
  );
  return dbConnectionPromise;
}

module.exports = connectToDB;
