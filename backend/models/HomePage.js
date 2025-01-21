const mongoose = require("mongoose");

const homePageSchema = new mongoose.Schema({
  name: { type: String, default: "Home" },
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
  subCategories: {
    type: [mongoose.Types.ObjectId],
    ref: "SubCategory",
    validate: {
      validator: (subCategories) => {
        if (!subCategories) {
          return false;
        }

        if (subCategories && !Array.isArray(subCategories)) {
          return false;
        }

        if (
          subCategories &&
          Array.isArray(subCategories) &&
          !subCategories.length
        ) {
          return false;
        }

        return true;
      },
      message: "At least one sub-category is required."
    },
    required: true
  }
});

const HomePage = mongoose.model("HomePage", homePageSchema);

module.exports = HomePage;
