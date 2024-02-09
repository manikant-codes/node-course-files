const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Failed to get all products from the database!",
      err: err.message,
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, msg: "Product not found!" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Failed to get product details!",
      err: err.message,
    });
  }
};

const addProduct = async (req, res) => {
  const data = req.body;

  if (!data || !data.productName || !data.productPrice) {
    res
      .status(400)
      .json({ success: false, msg: "Invalid product name or product price!" });
  }

  try {
    const result = await Product.create(data);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Failed to add product to the database!",
      err: err.message,
    });
  }
};

const updateProduct = (req, res) => {
  res.json({ msg: "product updated" });
};

const deleteProduct = (req, res) => {
  res.json({ msg: "product deleted" });
};

module.exports = {
  getAllProducts,
  getProductDetails,
  addProduct,
  updateProduct,
  deleteProduct,
};
