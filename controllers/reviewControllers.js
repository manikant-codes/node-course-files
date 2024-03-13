const asyncWrapper = require("../utils/asyncWrapper");

const createReview = asyncWrapper(async (req, res, next) => {
  res.send("create review");
});
const getAllReviews = asyncWrapper(async (req, res, next) => {
  res.send("get all reviews");
});
const getSingleReview = asyncWrapper(async (req, res, next) => {
  res.send("get single review");
});
const updateReview = asyncWrapper(async (req, res, next) => {
  res.send("update review");
});
const deleteReview = asyncWrapper(async (req, res, next) => {
  res.send("delete review");
});

module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getSingleReview,
};
