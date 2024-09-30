const express = require("express");
const fileUpload = require("express-fileupload");
const connectToDB = require("./db/connect");
const categoriesRouter = require("./routes/categoriesRoutes");
const cors = require("cors");
const subCategoriesRouter = require("./routes/subCategoriesRoutes");
require("dotenv").config();

const server = express();

server.use("/uploads", express.static("uploads"));
server.use(cors());
server.use(fileUpload());
server.use(express.json());

server.use("/categories", categoriesRouter);
server.use("/subCategories", subCategoriesRouter);

const start = async () => {
  try {
    await connectToDB();
    console.log("Connect to the database!");
    server.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}!`);
    });
  } catch (error) {
    console.log("Failed to connect to the database! Error: ", error.message);
  }
};

start();
