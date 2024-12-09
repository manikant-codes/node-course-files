const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 100, required: true },
  desc: { type: String, minLength: 10, maxLength: 1000 },
  price: { type: Number, min: 0, required: true },
  discountPercentage: { type: Number, min: 0, max: 100, default: 0 }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
