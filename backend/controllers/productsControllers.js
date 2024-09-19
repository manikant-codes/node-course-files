const Product = require("../models/Product");
const path = require("path");
const fs = require("fs/promises");
const { checkAndCreateDir } = require("../utils/fileUtils");
const { productValidator } = require("../validators/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(["category", "subCategory"]);
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

const addProduct = async (req, res) => {
  try {
    const { body, files } = req;

    productValidator(body, res);

    // Check if at least 2 images are there.
    if (!files.images || !Array.isArray(files.images)) {
      return res.status(400).json({
        success: false,
        msg: "At least 2 product images are required!",
      });
    }

    // Check if products folder exists in uploads.
    const pathToProductsDir = path.join(__dirname, "../uploads/products");
    await checkAndCreateDir(pathToProductsDir);

    const images = [];

    for (const image of files.images) {
      const uniqueName = Date.now() + "-" + image.name;
      const uploadPath = path.join(pathToProductsDir, uniqueName);
      await image.mv(uploadPath);
      images.push(`${process.env.BASE_URL}/uploads/products/${uniqueName}`);
    }

    const product = await Product.create({ ...body, images });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      body,
      files,
      params: { id },
    } = req;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        msg: "No such product exists!",
      });
    }

    productValidator(id, body, res);

    const pathToProductsDir = path.join(__dirname, "../uploads/products");
    await checkAndCreateDir(pathToProductsDir);

    const images = [];

    // If there are file save them in uploads/products and push their url in images array.
    if (files.images) {
      if (Array.isArray(files.images)) {
        for (const image of files.images) {
          const uniqueName = Date.now() + "-" + image.name;
          const uploadPath = path.join(pathToProductsDir, uniqueName);
          await image.mv(uploadPath);
          images.push(`${process.env.BASE_URL}/uploads/products/${uniqueName}`);
        }
      } else {
        const uniqueName = Date.now() + "-" + files.images.name;
        const uploadPath = path.join(pathToProductsDir, uniqueName);
        await files.images.mv(uploadPath);
        images.push(`${process.env.BASE_URL}/uploads/products/${uniqueName}`);
      }
    }

    const productsImagesInUplods = await fs.readdir(pathToProductsDir);

    // Check if images in existingProduct are in body.images, if not delete them from uploads/products folder.
    if (body.images) {
      for (const image of existingProduct.images) {
        if (!body.images.includes(image)) {
          const imageName = path.parse(image).base;
          if (productsImagesInUplods.includes(imageName)) {
            await fs.unlink(path.join(pathToProductsDir, imageName));
          }
        }
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      ...body,
      images: [...images, ...(body.images ? body.images : [])],
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteProduct = async (req, res) => {};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
