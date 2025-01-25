const mongoose = require("mongoose");
const { create } = require("./User");

const expiredTokenScheam = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: process.env.JWT_EXPIRY }
});

const ExpiredToken = mongoose.model("ExpiredToken", expiredTokenScheam);

module.exports = ExpiredToken;
