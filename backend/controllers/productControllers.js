const { saveFile, deleteFile } = require("../helpers/fileHelper");
const Product = require("../models/Product");

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
    if (!req.files || !req.files.images) {
      return res
        .status(400)
        .json({ success: false, msg: "Product image is required." });
    }

    if (Array.isArray(req.files.images)) {
      const temp = [];

      for (const image of req.files.images) {
        const imageURL = await saveFile(image, "product");
        temp.push(imageURL);
      }

      req.body.images = temp;
    } else {
      const imageURL = await saveFile(req.files.images, "product");
      req.body.images = [imageURL];
    }

    const product = await Product.create(req.body);

    res.status(500).json({ success: false, data: product });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
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

    for (const image of product.images) {
      await deleteFile(image, "product");
    }

    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, msg: "Product deleted successfully!" });
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
