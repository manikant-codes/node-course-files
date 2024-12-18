const mongoose = require("mongoose");
const express = require("express");

const server = express();

// Schema
const productSchema = new mongoose.Schema({
  no: { type: Number, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  price: { type: Number, min: 0, required: true },
  tax: { type: Number, min: 0, max: 100, default: 0 }
});

// Model
const Product = mongoose.model("Product", productSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/productsNew")
  .then(() => {
    console.log("Successfully connected to the database.");
    server.listen(5000, () => {
      console.log("Server is listening on port 5000.");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

const insertProduct = async () => {
  try {
    const product = await Product.create({
      no: 2,
      name: "B",
      price: 100,
      tax: 10
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllProducts = async () => {
  try {
    const products = await Product.find();
    console.log(products);
  } catch (error) {
    console.log(error.message);
  }
};

const getProductById = async () => {
  try {
    const product = await Product.findById("6762611f5dd122bbcb14e967");
    console.log(product);
  } catch (error) {
    console.log(error.message);
  }
};

const updateProduct = async () => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      "6762611f5dd122bbcb14e967",
      { name: "Hoodie", price: 500 },
      { new: true }
    );
    console.log(updatedProduct);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = async () => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      "67626153a7672c0d3c7b6be5"
    );
    console.log(deletedProduct);
  } catch (error) {
    console.log(error.message);
  }
};

deleteProduct();
// updateProduct();
// getProductById();
// getAllProducts();
// insertProduct();
