const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  images: {
    type: [String],
    validate: {
      validator: function (images) {
        if (Array.isArray(images) && images.length !== 0) {
          return true;
        }
        return false;
      },
      message: "At least one image is required!",
    },
  },
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  subCategories: { type: [mongoose.Types.ObjectId], ref: "SubCategory" },
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
