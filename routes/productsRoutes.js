const express = require("express");
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "All Products" });
});

productsRouter.post("/", (req, res) => {
  res.status(200).json({ msg: "Product Added" });
});

productsRouter.patch("/", (req, res) => {
  res.status(200).json({ msg: "Product Updated" });
});

productsRouter.delete("/", (req, res) => {
  res.status(200).json({ msg: "Product Deleted" });
});

module.exports = productsRouter;
