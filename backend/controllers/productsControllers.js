const Product = require("../models/Product");
const path = require("path");
const fs = require("fs/promises");
const { checkAndCreateDir, addFiles } = require("../utils/fileUtils");
const { productValidator } = require("../validators/productsValidators");
const { successDataRes, errorMsgRes } = require("../utils/responseUtils");

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
    await productValidator(req.body);

    const pathToProducts = path.join(__dirname, "../uploads/products");

    req.body.images = await addFiles(
      req.files.images,
      pathToProducts,
      `${process.env.BASE_URL}/uploads/products`
    );

    const product = await Product.create(req.body);
    successDataRes(res, product);
  } catch (error) {
    errorMsgRes(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      body,
      files,
      params: { id },
    } = req;

    // console.log("body.images", body.images); // undefined // str // []
    // console.log("files.images", files, files.images.length); // null // obj /// []

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        msg: "No such product exists!",
      });
    }

    if (body.images && !Array.isArray(body.images)) {
      body.images = [body.images];
    }

    await productValidator(body, id);

    if (
      (!files && !body.images) ||
      (files && !files.images.length && !body.images) ||
      (!files && body.images && body.images.length < 2)
    ) {
      return res.status(400).json({
        success: false,
        msg: "At least 2 product images are required!",
      });
    }

    const pathToProductsDir = path.join(__dirname, "../uploads/products");
    await checkAndCreateDir(pathToProductsDir);

    const images = [];

    console.log("body.images", body.images); // undefined // str // []
    console.log("files.images", files); // null // obj /// []

    // If there are file save them in uploads/products and push their url in images array.
    if (files && files.images) {
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

    // // Check if images in existingProduct are in body.images, if not delete them from uploads/products folder.
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

    const pathToProducts = path.join(__dirname, "../uploads/products");

    const filesInProducts = await fs.readdir(pathToProducts);

    for (const image of existingProduct.images) {
      const name = path.parse(image).base;
      if (filesInProducts.includes(name)) {
        await fs.unlink(path.join(pathToProducts, name));
      }
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
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
