const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, requried: true },
  slug: { type: String, minLength: 2, unique: true, requried: true },
  desc: { type: String, minLength: 10 },
  images: {
    type: [String],
    validate: {
      validator: function (value) {
        if (!value) return false;

        if (!Array.isArray(value)) return false;

        if (value.length <= 0) return false;

        return true;
      },
      message: "At least one image is required."
    },
    required: true
  },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "Subcategory",
    required: true
  },
  price: { type: Number, min: 0, required: true },
  quantity: { type: Number, min: 0, required: true },
  discountPercentage: { type: Number, min: 0, max: 100, default: 0 },
  taxPercentage: { type: Number, min: 0, max: 100, default: 0 },
  shippingFee: { type: Number, min: 0, default: 0 },
  colors: { type: [String] },
  sizes: { type: [String] }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
