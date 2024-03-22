const asyncWrapper = require("../utils/asyncWrapper");
const Review = require("../models/Review");
const Product = require("../models/Product");
const CustomError = require("../services/errorServices");
const checkAccess = require("../utils/checkAccess");

const getAllReviews = asyncWrapper(async (req, res, next) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId })
    .populate("user", "name email")
    .populate("product", "name price");
  res.status(200).json({ success: true, data: reviews });
});

const getSingleReview = asyncWrapper(async (req, res, next) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    return next(new CustomError(404, "No such review found!"));
  }

  res.status(200).json({ success: true, data: review });
});

const createReview = asyncWrapper(async (req, res, next) => {
  const { product: productId } = req.body;

  if (!productId) {
    return next(new CustomError(404, "Product id is required!"));
  }

  const existingProduct = await Product.findOne({ _id: productId });

  if (!existingProduct) {
    return next(new CustomError(404, "No such product found!"));
  }

  req.body.user = req.user.id;

  const review = new Review();

  review.rating = req.body.rating;
  review.user = req.body.user;
  review.product = req.body.product;
  if (req.body.title) {
    review.title = req.body.title;
  }
  if (req.body.comment) {
    review.comment = req.body.comment;
  }

  await review.save();

  // const review = await Review.create(req.body);

  res.status(200).json({ success: true, data: review });
});

const updateReview = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { title, comment, rating } = req.body;

  // const newReview = {};

  const existingReview = await Review.findOne({ _id: id });

  if (!existingReview) {
    return next(new CustomError(404, "No such review found!"));
  }

  const hasAccess = checkAccess(req.user.id, existingReview.user);

  if (!hasAccess) {
    return next(
      new CustomError(401, "Does not have permission to modify this review!")
    );
  }

  if (title?.trim()) {
    existingReview.title = title;
  }
  if (comment?.trim()) {
    existingReview.comment = comment;
  }
  if (rating) {
    existingReview.rating = rating;
  }

  // const review = await Review.findOneAndUpdate({ _id: id }, newReview, {
  //   new: true,
  // });

  const review = await existingReview.save();

  res.status(200).json({ success: true, data: review });
});

const deleteReview = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const existingReview = await Review.findOne({ _id: id });

  if (!existingReview) {
    return next(new CustomError(404, "No such review found!"));
  }

  const hasAccess = checkAccess(req.user.id, existingReview.user);

  if (!hasAccess) {
    return next(
      new CustomError(401, "Does not have permission to delete this review!")
    );
  }

  await existingReview.deleteOne();

  // await Review.findOneAndDelete({ _id: id });

  res.status(200).json({ success: true, msg: "Review deleted successfully!" });
});

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
