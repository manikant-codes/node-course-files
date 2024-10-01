const Category = require("../models/Category");
const { deleteFile, addFile } = require("../helpers/fileHelpers");
const { categoryValidator } = require("../validators/categoriesValidators");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found!" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    categoryValidator(req.files, req.body);

    req.body.image = await addFile(req.files.image, "categories");

    const category = await Category.create(req.body);

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found!" });
    }

    categoryValidator(req.files, req.body);

    if (req.files) {
      await deleteFile(existingCategory.image, "categories");

      req.body.image = await addFile(req.files.image, "categories");
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found!" });
    }

    await deleteFile(existingCategory.image, "categories");

    await Category.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, msg: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
