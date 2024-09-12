const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2 },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  categoryId: { type: mongoose.Types.ObjectId, ref: "Category" }
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
