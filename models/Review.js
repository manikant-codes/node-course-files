const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  title: {
    type: String,
  },
  comment: {
    type: String,
    maxLength: 300,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

ReviewSchema.static("ratingAggregation", function ratingAggregation(productId) {
  console.log("A 2");
  console.log("ReviewSchema", ReviewSchema.models);
  const result = this.model("Review").aggregate([
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
        totalRatings: {
          $sum: 1,
        },
      },
    },
  ]);
  console.log("A 3");
  console.log("result", result);
});

ReviewSchema.post("save", function () {
  console.log("A 1");
  ReviewSchema.statics.ratingAggregation(this._id);
  console.log("A 4");
});

module.exports = mongoose.model("Review", ReviewSchema);
