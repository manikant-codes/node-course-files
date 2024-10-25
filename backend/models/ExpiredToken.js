const mongoose = require("mongoose");

const expiredTokenSchema = new mongoose.Schema({
  token: { type: String, unique: true, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1d"
  }
});

const ExpiredToken = mongoose.model("ExpiredToken", expiredTokenSchema);

module.exports = ExpiredToken;
