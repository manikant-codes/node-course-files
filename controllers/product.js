const CustomError = require("../middlewares/customError");
const Product = require("../models/product");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    next(new Error(err));
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id);

    if (!result) {
      return next(new CustomError(404, "Product not found!"));
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(new Error(err));
  }
};

const addProduct = async (req, res, next) => {
  const data = req.body;

  if (!data || !data.productName || !data.productPrice) {
    return next(new CustomError(400, "Invalid product name or product price!"));
  }

  try {
    const result = await Product.create(data);
    res.json({ success: true, data: result });
  } catch (err) {
    next(new Error(err));
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  if (
    !req.body ||
    (!req.body.productName &&
      !req.body.productDescription &&
      !req.body.productPrice)
  ) {
    return next(new CustomError(400, `Bad request!`));
  }

  try {
    const result = await Product.findByIdAndUpdate(id, req.body, {
      returnOriginal: false,
    });

    if (!result) {
      return next(new CustomError(404, `No such product found!`));
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(new Error(err));
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      console.log("result", result);
      return next(new CustomError(404, "No such product found!"));
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(new Error(err));
  }
};

module.exports = {
  getAllProducts,
  getProductDetails,
  addProduct,
  updateProduct,
  deleteProduct,
};
