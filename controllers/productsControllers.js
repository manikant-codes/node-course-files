const asyncWrapper = require("../utils/asyncWrapper");
const Product = require("../models/Product");
const CustomError = require("../services/errorServices");
const path = require("path");
const getFileName = require("../utils/fileHelper");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error!" });
  }
};

const getSingleProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("reviews");

           if (!product) {
    return next(new CustomError(404, "No such product found!"));
  }

  res.status(200).json({ success: true, data: product });
});

const createProduct = asyncWrapper(async (req, res, next) => {
  const { user } = req;
  const product = await Product.create({ ...req.body, user: user.id });
  res.status(200).json({ success: true, data: product });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    return next(new CustomError(404, "No such product found!"));
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
  });

  res.status(200).json({ success: true, data: updatedProduct });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const existingProduct = await Product.findOne({ _id: id });

  if (!existingProduct) {
    return next(new CustomError(404, "No such product found!"));
  }

  await existingProduct.deleteOne();

  // await Product.findByIdAndDelete(id);

  res.status(200).json({ success: true, msg: "Product deleted successfully!" });
});

const uploadImage = asyncWrapper(async (req, res, next) => {
  console.log("req.files", req.files);
  const image = req.files.image;

  if (!image) {
    return next(new CustomError(404, "No image provided!"));
  }

  if (!image.mimetype.startsWith("image")) {
    return next(new CustomError(404, "Please provide a valid image file!"));
  }

  const maxFileSize = 1024 * 1024;

  if (image.size > maxFileSize) {
    return next(
      new CustomError(404, "Please provide an image file less than 1MB!")
    );
  }

  const fileName = getFileName(image.name);
  await image.mv(path.join(__dirname, "../public", "images", fileName));

  res.status(200).json({ success: true, imageURL: `/images/${fileName}` });
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
};
