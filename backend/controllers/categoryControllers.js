const {
  sendErrorResponse,
  sendDataResponse
} = require("../helpers/resHelpers");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");
const Page = require("../models/Page");
const { saveFile, deleteFile } = require("../helpers/fileHelpers");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
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
    if (!req.files || !req.files.image) {
      return sendErrorResponse(res, "Category image is required.", 400);
    }

    const category = await Category.findOne({ slug: req.body.slug });

    if (category) {
      return sendErrorResponse(res, "Category by this name already exists.");
    }

    const imageURL = await saveFile(req.files.image, "category");

    const newCategory = await Category.create({
      name: req.body.name,
      slug: req.body.slug,
      image: imageURL
    });

    sendDataResponse(res, newCategory);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return sendErrorResponse(res, "No such category found.", 404);
    }

    if (!req.body) {
      req.body = {};
    }

    if (req.files && req.files.image) {
      const imageURL = await saveFile(req.files.image, "category");
      await deleteFile(category.image, "category");
      req.body.image = imageURL;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true
    });

    sendDataResponse(res, updatedCategory);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return sendErrorResponse(res, "No such category found.", 404);
    }

    const subCategory = await SubCategory.findOne({ category: id });
    const product = await Product.findOne({ category: id });
    const page = await Page.findOne({ slug: category.slug });

    if (subCategory || product || page) {
      return sendErrorResponse(
        res,
        "Category cannot be deleted as it is associated with other resources."
      );
    }

    await deleteFile(category.image, "category");

    const deletedCategory = await Category.findByIdAndDelete(id);

    sendDataResponse(res, deletedCategory);
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
