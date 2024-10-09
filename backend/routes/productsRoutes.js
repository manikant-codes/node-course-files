const express = require("express");
const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug
} = require("../controllers/productsControllers");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProduct);
productsRouter.get("/single/:slug", getProductBySlug);
productsRouter.post("/", addProduct);
productsRouter.patch("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
