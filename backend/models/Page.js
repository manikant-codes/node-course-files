const mongoose = require("mongoose");
const { minLengthOneValidator } = require("../validators/productsValidator");

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  images: {
    type: [String],
    validate: {
      validator: (value) => {
        return minLengthOneValidator(value);
      },
      message: "At least one image is required!"
    }
  },
  subCategories: {
    type: [mongoose.Types.ObjectId],
    ref: "SubCategory",
    validate: {
      validator: (value) => {
        return minLengthOneValidator(value);
      },
      message: "At least one sub-category is required!"
    }
  }
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
