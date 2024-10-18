const express = require("express");
const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug
} = require("../controllers/productsControllers");
const { authenticateAdmin } = require("../middlewares/authentication");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProduct);
productsRouter.get("/single/:slug", getProductBySlug);
productsRouter.post("/", authenticateAdmin, addProduct);
productsRouter.patch("/:id", authenticateAdmin, updateProduct);
productsRouter.delete("/:id", authenticateAdmin, deleteProduct);

module.exports = productsRouter;
