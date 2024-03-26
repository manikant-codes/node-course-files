const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const {
  authMiddleware,
  permissionMiddleware,
} = require("../middlewares/authMiddleware");
const { getSingleProductReviews } = require("../controllers/reviewControllers");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/uploadImage", uploadImage);
router.get("/:id", getSingleProduct);
router.post(
  "/",
  authMiddleware,
  permissionMiddleware(["admin"]),
  createProduct
);
router.patch(
  "/:id",
  authMiddleware,
  permissionMiddleware(["admin"]),
  updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware(["admin"]),
  deleteProduct
);

router.get("/:id/reviews", getSingleProductReviews);

module.exports = router;
