const {
  addMultipleFiles,
  addFile,
  deleteMultipleFiles
} = require("../helpers/fileHelpers");
const Product = require("../models/Product");
const { productValidator } = require("../validators/productsValidator");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(["category", "subCategory"]);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found!" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    productValidator(req.files, req.body);

    if (Array.isArray(req.files?.images)) {
      const imagesURL = await addMultipleFiles(req.files.images, "products");
      req.body.images = imagesURL;
    } else {
      const imageURL = await addFile(req.files.images, "products");
      req.body.images = [imageURL];
    }

    const product = await Product.create(req.body);

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    productValidator(req.files, req.body);
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found!" });
    }

    if (!req.body.images) {
      req.body.images = [];
    } else if (req.body.images && !Array.isArray(req.body.images)) {
      req.body.images = [req.body.images];
    }

    await deleteMultipleFiles(product.images, "products", req.body.images);

    if (req.files) {
      if (Array.isArray(req.files.images)) {
        const imagesURL = await addMultipleFiles(req.files.images, "products");
        req.body.images = [...req.body.images, ...imagesURL];
      } else {
        const imageURL = await addFile(req.files.images, "products");
        req.body.images = [...req.body.images, imageURL];
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found!" });
    }

    await deleteMultipleFiles(product.images, "products");

    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, msg: "Product deleted successfully!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
