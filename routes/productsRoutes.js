const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productsControllers");
const productsRouter = express.Router();

productsRouter.get("/products", getAllProducts);
productsRouter.get("/products/:id", getProductById);
productsRouter.post("/products", addProduct);
productsRouter.patch("/products/:id", updateProduct);
productsRouter.delete("/products/:id", deleteProduct);

module.exports = productsRouter;
