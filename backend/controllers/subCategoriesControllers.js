const { addFile, deleteFile } = require("../helpers/fileHelpers");
const SubCategory = require("../models/SubCategory");
const {
  subCategoryValidator,
} = require("../validators/subCategoriesValidators");
const path = require("path");

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
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

    const pathToSubCategories = path.join(
      __dirname,
      "../uploads/subCategories"
    );

    req.body.image = await addFile(
      req.files.image,
      pathToSubCategories,
      `${process.env.BASE_URL}/uploads/subCategories`
    );

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

    const pathToSubCategories = path.join(
      __dirname,
      "../uploads/subCategories"
    );

    await deleteFile(subCategory.image, pathToSubCategories);

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
  deleteSubCategory,
};
