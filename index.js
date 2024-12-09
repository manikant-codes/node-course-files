const express = require("express");
const connect = require("./db/connect");
const productRouter = require("./routes/productRouter");

const server = express();

server.use(express.json());

server.use("/products", productRouter);

const start = async () => {
  try {
    await connect();
    console.log("Successfully connected to the db.");
    server.listen(5000, () => {
      console.log("Server is listening on port 5000.");
    });
  } catch (error) {
    console.log("Failed to connect to the db. " + error.message);
  }
};

start();

// connect()
//   .then(() => {
//     console.log("Successfully connected to the db.");
//     server.listen(5000, () => {
//       console.log("Server is listening on port 5000.");
//     });
//   })
//   .catch((error) => {
//     console.log("Failed to connect to the db. " + error.message);
//   });
