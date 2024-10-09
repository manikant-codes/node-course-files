const { addFile, deleteFile } = require("../helpers/fileHelpers");
const SubCategory = require("../models/SubCategory");
const {
  subCategoryValidator
} = require("../validators/subCategoriesValidators");

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such sub-category found!" });
    }

    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addSubCategory = async (req, res) => {
  try {
    subCategoryValidator(req);

    req.body.image = await addFile(req.files.image, "subCategories");

    const subCategory = await SubCategory.create(req.body);

    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    subCategoryValidator(req);
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such sub-category found!" });
    }

    if (req.files) {
      await deleteFile(subCategory.image, "subCategories");
      req.body.image = await addFile(req.files.image, "subCategories");
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

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such sub-category found!" });
    }

    await deleteFile(subCategory.image, "subCategories");

    await SubCategory.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, msg: "Sub-category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
};
