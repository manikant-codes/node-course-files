const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, required: true },
  slug: { type: String, minLength: 2, unique: true, required: true },
  images: {
    type: [String],
    validate: {
      validator: function (value) {
        if (!value) {
          return false;
        }

        if (!Array.isArray(value)) {
          return false;
        }

        if (value.length === 0) {
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
    validate: {
      validator: function (value) {
        if (!value) {
          return false;
        }

        if (!Array.isArray(value)) {
          return false;
        }

        if (value.length === 0) {
          return false;
        }

        return true;
      },
      message: "At least one sub-category is required."
    },
    required: true
  }
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
