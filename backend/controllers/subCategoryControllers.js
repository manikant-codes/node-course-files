const { saveFile, deleteFile } = require("../helpers/fileHelper");
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Page = require("../models/Page");

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getAllSubCategoriesByCategorySlug = async (req, res) => {
  try {
    const { categorySlug } = req.params;

    const category = await Category.findOne({ slug: categorySlug });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found." });
    }

    const subCategories = await SubCategory.find({ category: category._id });

    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getAllSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subCategories = await SubCategory.find({ category: categoryId });

    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such sub-category found." });
    }

    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addSubCategory = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, msg: "Sub-category image is required." });
    }

    const imageURL = await saveFile(req.files.image, "subCategory");

    const subCategory = await SubCategory.create({
      ...req.body,
      image: imageURL
    });

    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such sub-category found." });
    }

    if (!req.body) {
      req.body = {};
    }

    if (req.files && req.files.image) {
      await deleteFile(subCategory.image, "subCategory");
      req.body.image = await saveFile(req.files.image, "subCategory");
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedSubCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ subCategory: id });
    const page = await Page.findOne({ subCategories: id });

    if (product || page) {
      return res.status(400).json({
        success: false,
        msg: "Sub-category cannot be deleted as it is being used."
      });
    }

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such sub-category found." });
    }

    await deleteFile(subCategory.image, "subCategory");

    await SubCategory.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, msg: "Sub-category deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllSubCategories,
  getAllSubCategoriesByCategorySlug,
  getAllSubCategoriesByCategoryId,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
};
