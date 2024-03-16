const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productsControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/", authMiddleware, permissionMiddleware, createProduct);
router.patch("/:id", authMiddleware, permissionMiddleware, updateProduct);
router.delete("/:id", authMiddleware, permissionMiddleware, deleteProduct);

module.exports = router;
