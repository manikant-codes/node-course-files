const express = require("express");
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "All products" });
});

productsRouter.post("/", (req, res) => {
  res.status(200).json({ msg: "Product added" });
});

productsRouter.patch("/", (req, res) => {
  res.status(200).json({ msg: "Product updated" });
});

productsRouter.delete("/", (req, res) => {
  res.status(200).json({ msg: "Product deleted" });
});

module.exports = productsRouter;
