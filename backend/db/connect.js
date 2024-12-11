const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(process.env.MONGO_URL);
};

module.exports = connect;
