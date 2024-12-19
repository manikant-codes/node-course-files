const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productsControllers");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getProductById);

productsRouter.post("/", addProduct);

productsRouter.patch("/:id", updateProduct);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
