const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, required: true },
  slug: { type: String, minLength: 2, unique: true, required: true },
  desc: { type: String, minLength: 10 },
  images: {
    type: [String],
    validate: {
      validator: (images) => {
        if (!images) {
          return false;
        }

        if (images && !Array.isArray(images)) {
          return false;
        }

        if (images && Array.isArray(images) && !images.length) {
          return false;
        }

        return true;
      },
      message: "At least one image is required."
    },
    required: true
  },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "SubCategory",
    required: true
  },
  price: { type: Number, min: 0, required: true },
  discountPercentage: { type: Number, min: 0, max: 100, default: 0 },
  taxPercentage: { type: Number, min: 0, max: 100, default: 0 },
  shippingFee: { type: Number, min: 0, default: 0 },
  colors: { type: [String] },
  sizes: { type: [String] }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
