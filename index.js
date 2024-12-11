const express = require("express");
const products = require("./data");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require("./controllers/productsControllers");
const productsRouter = require("./routes/productsRoutes");

const server = express();

server.use(productsRouter);

server.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});
