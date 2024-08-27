const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsControllers");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getSingleProduct);
productsRouter.post("/", addProduct);
productsRouter.patch("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
