const mongoose = require("mongoose");
const { checkIfEmptyArray } = require("../helpers/validationHelper");

const pageSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, required: true },
  slug: { type: String, minLength: 2, unique: true, required: true },
  images: {
    type: [String],
    validate: {
      validator: checkIfEmptyArray,
      message: "At least one image is required."
    },
    required: true
  },
  subCategories: {
    type: [mongoose.Types.ObjectId],
    ref: "SubCategory",
    validate: {
      validator: checkIfEmptyArray,
      message: "At least one sub-category is required."
    },
    required: true
  }
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
