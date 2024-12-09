const {
  sendErrorResponse,
  sendDataResponse
} = require("../helpers/resHelpers");
const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    sendDataResponse(res, categories);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return sendErrorResponse(res, "No such category found.", 404);
    }

    sendDataResponse(res, category);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addCategory = async (req, res) => {
  try {
    console.log("req.files", req.files);
    // const category = await Category.create({});
    sendDataResponse(res, null);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
};
