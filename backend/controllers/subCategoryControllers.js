const { saveFile, deleteFile } = require("../helpers/fileHelpers");
const {
  sendErrorResponse,
  sendDataResponse
} = require("../helpers/resHelpers");
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Page = require("../models/Page");

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");
    sendDataResponse(res, subCategories);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getAllSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subCategories = await SubCategory.find({ category: categoryId });

    sendDataResponse(res, subCategories);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getAllSubCategoriesByCategorySlug = async (req, res) => {
  try {
    const { categorySlug } = req.params;

    const category = await Category.findOne({ slug: categorySlug });

    if (!category) {
      return sendErrorResponse(res, "No such category found.", 404);
    }

    const subCategories = await SubCategory.find({ category: category._id });

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
    if (!req.files || !req.files.image) {
      return sendErrorResponse(res, "Sub-category image is required.", 400);
    }

    const imageURL = await saveFile(req.files.image, "subCategory");

    const subCategory = await SubCategory.create({
      name: req.body.name,
      slug: req.body.slug,
      category: req.body.category,
      image: imageURL
    });

    sendDataResponse(res, subCategory);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return sendErrorResponse(res, "No such sub-category found.", 400);
    }

    if (!req.body) {
      req.body = {};
    }

    if (req.files && req.files.image) {
      const imageURL = await saveFile(req.files.image, "subCategory");

      await deleteFile(subCategory.image, "subCategory");

      req.body.image = imageURL;
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    sendDataResponse(res, updatedSubCategory);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return sendErrorResponse(res, "No such sub-category found.", 404);
    }

    const product = await Product.findOne({ category: id });
    const page = await Page.findOne({ subCategories: id });

    if (product || page) {
      return sendErrorResponse(
        res,
        "Sub-category is being used in products or pages.",
        400
      );
    }

    await deleteFile(subCategory.image, "subCategory");

    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

    sendDataResponse(res, deletedSubCategory);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllSubCategories,
  getAllSubCategoriesByCategoryId,
  getAllSubCategoriesByCategorySlug,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
};
