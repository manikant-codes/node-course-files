const express = require("express");
const connectToDB = require("./db/connect");
const fileUpload = require("express-fileupload");
const categoriesRouter = require("./routes/categoriesRoutes");
require("dotenv").config();
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());
server.use("/uploads", express.static("uploads"));

server.use("/categories", categoriesRouter);

const start = async () => {
  try {
    await connectToDB();
    console.log("Connected to database!");
    server.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}!`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
