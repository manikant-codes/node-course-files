const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  title: {
    type: String,
  },
  comment: {
    type: String,
    maxLength: 300,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
