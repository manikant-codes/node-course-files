const express = require("express");
const connect = require("./db/connect");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const categoryRouter = require("./routes/categoryRouter");
const subCategoryRouter = require("./routes/subCategoryRouter");
dotenv.config();

const server = express();

server.use("/uploads", express.static("uploads"));
server.use(fileUpload());

server.use("/categories", categoryRouter);
server.use("/subCategories", subCategoryRouter);

const start = async () => {
  try {
    await connect();
    console.log("Successfully connected to the db.");
    server.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}.`);
    });
  } catch (error) {
    console.log("Failed to connect to the db. " + error.message);
  }
};

start();
