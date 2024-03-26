const Product = require("../models/Product");
const CustomError = require("../services/customError");
const asyncWrapper = require("../utils/asyncWrapper");
const path = require("path");

const createProduct = asyncWrapper(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, data: product });
});

const getAllProducts = asyncWrapper(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({ success: true, data: products });
});

const getSingleProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("reviews");

  if (!product) {
    return next(new CustomError("No such product found!", 404));
  }

  res.status(200).json({ success: true, data: product });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    returnOriginal: false,
  });
  if (!product) {
    return next(new CustomError("No such product found!", 404));
  }
  res.status(200).json({ success: true, data: product });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(new CustomError("No such product found!", 404));
  }

  await product.deleteOne();

  res.status(200).json({ success: true, msg: "Product deleted successfully!" });
});

const uploadImage = asyncWrapper(async (req, res, next) => {
  if (!req.files) {
    return next(new CustomError("No image provided!", 400));
  }

  const image = req.files.image;

  if (!image.mimetype.startsWith("image")) {
    return next(new CustomError("File type is not an image!", 400));
  }

  const maxSize = 1024 * 1024;

  if (image.size > maxSize) {
    return next(
      new CustomError(
        "File too large! Please upload a file smaller than " +
          maxSize / 1024 +
          "MB.",
        400
      )
    );
  }

  const imagePath = path.join(__dirname, "../public/uploads/" + image.name);
  await image.mv(imagePath);
  res.status(200).json({ success: true, data: "/uploads/" + image.name });
});

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
