const express = require("express");
const {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getSingleReview);
router.post("/", authMiddleware, createReview);
router.patch("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
