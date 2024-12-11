const {
  sendErrorResponse,
  sendDataResponse
} = require("../helpers/resHelpers");
const SubCategory = require("../models/SubCategory");

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    sendDataResponse(res, subCategories);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return sendErrorResponse(res, "No suvh sub-category found.", 404);
    }

    sendDataResponse(res, subCategory);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addSubCategory = async (req, res) => {
  try {
    sendDataResponse(res, null);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }       
};

const updateSubCategory = async (req, res) => {
  try {
    sendDataResponse(res, null);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    sendDataResponse(res, null);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
};
