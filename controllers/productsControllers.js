const Product = require("../models/productsModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found." });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found." });
    }

    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, msg: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
