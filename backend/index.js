const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connect = require("./db/connect");
const fileUpload = require("express-fileupload");
const categoryRouter = require("./routes/categoryRouter");
const subCategoryRouter = require("./routes/subCategoryRouter");
const productRouter = require("./routes/productRouter");
const pageRouter = require("./routes/pageRouter");
var cors = require("cors");
const homePageRouter = require("./routes/homePageRouter");
const authRouter = require("./routes/authRouter");
const orderRouter = require("./routes/orderRouter");

const server = express();

server.use(cors());
server.use(fileUpload());
server.use(express.json());
server.use("/uploads", express.static("uploads"));

server.use("/categories", categoryRouter);
server.use("/subCategories", subCategoryRouter);
server.use("/products", productRouter);
server.use("/pages", pageRouter);
server.use("/homePages", homePageRouter);
server.use("/auth", authRouter);
server.use("/orders", orderRouter);

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
