const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: { type: String, minLength: 2, required: true },
  slug: { type: String, minLength: 2, unique: true, required: true },
  image: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true }
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
