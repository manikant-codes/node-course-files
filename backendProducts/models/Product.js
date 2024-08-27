const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 200 },
  desc: { type: String, minLength: 10, maxLength: 1000 },
  price: { type: Number, min: 0, required: true },
  rating: { type: Number, min: 0, max: 5 },
  imageURL: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
