const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    desc: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 1000,
      required: true,
    },
    image: { type: String, required: true },
    sellingPrice: { type: Number, min: 0 },
    price: { type: Number, min: 0, required: true },
    qty: { type: Number, min: 0, default: 0 },
    category: {
      type: String,
      enum: ["hoodies", "t-shirts", "shirt", "cap", "glasses"],
      requried: true,
    },
    color: { type: [String], default: [] },
    size: {
      type: [String],
      enum: ["xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      default: [],
    },
    avgRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
