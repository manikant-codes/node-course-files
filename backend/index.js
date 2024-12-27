const express = require("express");
const connectToDB = require("./db/connect");
const categoriesRouter = require("./routes/categoriesRouter");
const fileUpload = require("express-fileupload");
const subcategoriesRouter = require("./routes/subcategoriesRouter");

const server = express();

server.use(express.json());
server.use(fileUpload());
server.use("/uploads", express.static("uploads"));

server.use("/categories", categoriesRouter);
server.use("/subcategories", subcategoriesRouter);

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
