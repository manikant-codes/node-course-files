const express = require("express");
const connectToDB = require("./db/connect");
const productsRouter = require("./routes/productsRouter");

const server = express();

server.use("/products", productsRouter);

connectToDB()
  .then(() => {
    console.log("Successfully connected to the DB.");
    server.listen(5000, () => {
      console.log("Server is listening on port 5000.");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
