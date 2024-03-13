const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
      maxLength: [100, "Product name cannot be more that 100 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxLength: [
        1000,
        "Product description cannot be more that 1000 characters long",
      ],
    },
    image: {
      type: String,
      default: "/uploads/example.jpg",
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Product company is required"],
      enum: {
        values: ["ikea", "nilkamal", "ddecor"],
        message: "{VALUE} is not supported!",
      },
    },
    color: {
      type: [String],
      required: [true, "Product color is required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
