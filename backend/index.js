const express = require("express");
const dotenv = require("dotenv");
const connect = require("./db/connect");
const categoryRouter = require("./routes/categoryRouter");
dotenv.config();

const server = express();

server.use("/categories", categoryRouter);

const start = async () => {
  try {
    await connect();
    console.log("Successfully connected to the db.");
    server.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}.`);
    });
  } catch (error) {
    console.log("Faile to connect to the db. " + error.message);
  }
};

start();
