const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, minLength: 2, maxLength: 100, required: true },
    slug: {
      type: String,
      minLength: 2,
      maxLength: 100,
      unique: true,
      required: true
    },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
