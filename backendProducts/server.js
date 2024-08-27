const express = require("express");
const connectToDB = require("./db/connect");
const productsRouter = require("./routes/productsRoutes");

const server = express();

server.use("/products", productsRouter);

connectToDB()
  .then(() => {
    console.log("Connected to the database.");
    server.listen(5000, () => {
      console.log("Server is listening on port 5000.");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
