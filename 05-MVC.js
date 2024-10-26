const express = require("express");
const server = express();
const path = require("path");
const productsRouter = require("./routes/productsRoutes");

server.use("/products", productsRouter);

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
