const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProductsBySubCategorySlug,
  getProductBySlug
} = require("../controllers/productControllers");
const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get(
  "/subCategory/:subCategorySlug",
  getAllProductsBySubCategorySlug
);
productRouter.get("/:id", getProductById);
productRouter.get("/slug/:slug", getProductBySlug);
productRouter.post("/", addProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
