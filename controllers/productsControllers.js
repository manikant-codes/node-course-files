const asyncWrapper = require("../utils/asyncWrapper");

const getAllProducts = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error!" });
  }
};
const getSingleProduct = asyncWrapper(async (req, res, next) => {});
const createProduct = asyncWrapper(async (req, res, next) => {});
const updateProduct = asyncWrapper(async (req, res, next) => {});
const deleteProduct = asyncWrapper(async (req, res, next) => {});

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
