const mongoose = require("mongoose");
const { minLengthOneValidator } = require("../validators/productsValidator");

const productSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, required: true },
  slug: { type: String, unique: true, required: true },
  desc: { type: String, minLength: 10, required: true },
  images: {
    type: [String],
    validate: {
      validator: (value) => {
        return minLengthOneValidator(value);
      },
      message: "At least one image is required!"
    }
  },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "SubCategory",
    required: true
  },
  quantity: { type: Number, min: 0, default: 0 },
  price: { type: Number, min: 0, required: true },
  deliveryCharges: { type: Number, min: 0, default: 0 },
  discountPercentage: { type: Number, min: 0, max: 100, default: 0 },
  taxPercentage: { type: Number, min: 0, max: 100, default: 0 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  numberOfReviews: { type: Number, min: 0, default: 0 },
  // colors: {
  //   type: [String],
  //   validate: {
  //     validator: (value) => {
  //       return minLengthOneValidator(value);
  //     },
  //     message: "Invalid colors!",
  //   },
  // },
  // sizes: {
  //   type: [String],
  //   validate: {
  //     validator: (value) => {
  //       const validSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  //       const isMinLengthOne = minLengthOneValidator(value);

  //       if (!isMinLengthOne) {
  //         return false;
  //       }

  //       for (const v of value) {
  //         if (!validSizes.includes(v)) {
  //           return false;
  //         }
  //       }

  //       return true;
  //     },
  //     message: "Invalid sizes!",
  //   },
  // },
  isTrending: { type: Boolean, default: false }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
