const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsControllers");
const router = express.Router();

router.get("/:id", getAllReviews);
router.get("/single/:id", getSingleReview);
router.post("/", authMiddleware, createReview);
router.patch("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
