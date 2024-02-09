const express = require("express");
const {
  getAllProducts,
  getProductDetails,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductDetails);

router.post("/", addProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
