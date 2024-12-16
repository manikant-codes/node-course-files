const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, minLength: 2, required: true },
  slug: {
    type: String,
    minLength: 2,
    unique: true,
    required: true
  },
  image: { type: String, required: true }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
