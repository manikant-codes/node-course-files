const mongoose = require("mongoose");
const Product = require("./Product");

const ReviewSchema = mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, trim: true, required: true, maxLength: 100 },
    comment: { type: String, trim: true, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  }
);

// Setting unique index so that a user can only leave one review per product.
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAvgRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  try {
    await Product.findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};

ReviewSchema.post("save", async function () {
  this.constructor.calculateAvgRating(this.product);
});

ReviewSchema.post("deleteOne", { document: true }, async function () {
  this.constructor.calculateAvgRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
