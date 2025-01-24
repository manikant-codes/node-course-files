const express = require("express");
const dotenv = require("dotenv");
const connect = require("./db/connect");
const categoryRouter = require("./routes/categoryRouter");
dotenv.config();
const fileUpload = require("express-fileupload");
const subCategoryRouter = require("./routes/subCategoryRouter");
const productRouter = require("./routes/productRouter");
const pageRouter = require("./routes/pageRouter");
const cors = require("cors");
const authRouter = require("./routes/authRouter");

const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());

server.use("/uploads", express.static("uploads"));

server.use("/categories", categoryRouter);
server.use("/subCategories", subCategoryRouter);
server.use("/products", productRouter);
server.use("/pages", pageRouter);
server.use("/auth", authRouter);

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
