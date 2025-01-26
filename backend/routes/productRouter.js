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
const { adminAuthMiddleware } = require("../middlewares/authMiddlewares");
const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get(
  "/subCategory/:subCategorySlug",
  getAllProductsBySubCategorySlug
);
productRouter.get("/:id", getProductById);
productRouter.get("/slug/:slug", getProductBySlug);
productRouter.post("/", adminAuthMiddleware, addProduct);
productRouter.patch("/:id", adminAuthMiddleware, updateProduct);
productRouter.delete("/:id", adminAuthMiddleware, deleteProduct);

module.exports = productRouter;
