const mongoose = require("mongoose");

function connect() {
  return mongoose.connect(process.env.MONGO_URI);
}

module.exports = connect;
