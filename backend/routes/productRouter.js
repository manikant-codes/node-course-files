const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProductsBySubCategorySlug
} = require("../controllers/productControllers");
const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get(
  "/subCategory/:subCategorySlug",
  getAllProductsBySubCategorySlug
);
productRouter.get("/:id", getProductById);
productRouter.post("/", addProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
