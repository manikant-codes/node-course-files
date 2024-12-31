const { saveFile, deleteFile } = require("../helpers/fileHelper");
const SubCategory = require("../models/SubCategory");

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
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
      //   const imageURL = await saveFile(req.files.image, "subCategory");
      //   req.body.image = imageURL;
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
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
};
