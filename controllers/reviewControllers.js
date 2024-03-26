const asyncWrapper = require("../utils/asyncWrapper");
const Review = require("../models/Review");
const Product = require("../models/Product");
const CustomError = require("../services/customError");
const checkPermission = require("../utils/checkPermission");

const createReview = asyncWrapper(async (req, res, next) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    next(new CustomError("No such product found!", 404));
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.id,
  });

  if (alreadySubmitted) {
    next(new CustomError("No such product found!", 404));
  }

  req.body.user = req.user.id;
  const review = await Review.create(req.body);
  res.status(200).json({ success: true, data: review });
});

const getAllReviews = asyncWrapper(async (req, res, next) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name company price ",
  });
  res.status(200).json({ success: true, data: reviews });
});

const getSingleReview = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });

  if (!review) {
    next(new CustomError("No such review found!", 404));
  }

  res.status(200).json({ success: true, data: review });
});

const updateReview = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: id });

  if (!review) {
    next(new CustomError("No such review found!", 404));
  }

  checkPermission(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();

  res.status(200).json({ success: true, data: review });
});

const deleteReview = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });

  if (!review) {
    next(new CustomError("No such review found!", 404));
  }

  checkPermission(req.user, review.user);

  await review.deleteOne();

  // Deprecated!
  // await review.remove();

  res.status(200).json({ success: true, msg: "Review removed!" });
});

const getSingleProductReviews = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;
});

module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getSingleReview,
  getSingleProductReviews,
};
