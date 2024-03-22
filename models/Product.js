const mongoose = require("mongoose");
const Review = require("./Review");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    desc: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 1000,
      required: true,
    },
    image: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    qty: { type: Number, min: 0, default: 0 },
    category: {
      type: String,
      enum: ["hoodies", "t-shirts", "shirt", "cap", "glasses"],
      requried: true,
    },
    color: { type: [String], default: [] },
    size: {
      type: [String],
      // enum: ["xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      default: [],
    },
    avgRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.pre("deleteOne", { document: true }, async function () {
  await Review.deleteMany({ product: this._id });
});

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // match: { rating: 5 },
});

module.exports = mongoose.model("Product", ProductSchema);
