const Product = require("../models/Product");
const path = require("path");
const fs = require("fs/promises");
const {
  checkAndCreateDir,
  addFiles,
  deleteFiles,
  addSingleFile
} = require("../utils/fileUtils");
const { productValidator } = require("../validators/productsValidators");
const { successDataRes, errorMsgRes } = require("../utils/responseUtils");
const { minTwoFilesValidator } = require("../validators/commonValidators");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

const getAllProducts = async (req, res) => {
  try {
    // const filters = req.query;
    const { category, subCategory, trending } = req.query;

    const filters = {};

    if (category) {
      const foundCategory = await Category.findOne({ slug: category });
      if (foundCategory) {
        filters.category = foundCategory._id;
      }
    }

    if (subCategory) {
      const foundSubCategory = await SubCategory.findOne({ slug: subCategory });
      if (foundSubCategory) {
        filters.subCategory = foundSubCategory._id;
      }
    }

    if (trending) {
      filters.isTrending = true;
    }

    const products = await Product.find(filters).populate([
      "category",
      "subCategory"
    ]);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ success: false, msg: "No such product found!" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (!product) {
      res.status(404).json({ success: false, msg: "No such product found!" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    await productValidator(req.body);

    req.body.images = await addFiles(req.files.images, "products");

    const product = await Product.create(req.body);
    successDataRes(res, product);
  } catch (error) {
    errorMsgRes(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return errorMsgRes(res, "No such product found!", 404);
    }

    await productValidator(req.body, id);

    minTwoFilesValidator(req.files?.images, req.body.images);

    if (!req.body.images) {
      req.body.images = [];
    } else if (req.body.images && !Array.isArray(req.body.images)) {
      req.body.images = [req.body.images];
    }

    let images = [];

    // If there are file save them in uploads/products and push their url in images array.
    if (req.files?.images) {
      if (Array.isArray(req.files.images)) {
        const urls = await addFiles(req.files.images, "products");
        images = images.concat(urls);
      } else {
        const url = await addSingleFile(req.files.images, "products");
        images.push(url);
      }
    }

    // Check if images in existingProduct are in body.images, if not delete them from uploads/products folder.
    await deleteFiles(existingProduct.images, "products", req.body.images);

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      ...req.body,
      images: [...images, ...req.body.images]
    });

    successDataRes(res, updatedProduct);
  } catch (error) {
    errorMsgRes(res, error.message, error.status || 500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product exists!" });
    }

    await deleteFiles(existingProduct.images, "products");

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
  getProduct,
  getProductBySlug,
  addProduct,
  updateProduct,
  deleteProduct
};
