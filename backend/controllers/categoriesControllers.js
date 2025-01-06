const Category = require("../models/Category");
const path = require("path");
const fs = require("fs/promises");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "No such category found." });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, message: "Category image is required." });
    }

    const existingCategory = await Category.findOne({ slug: req.body.slug });

    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category slug already exists." });
    }

    const fileName = Date.now() + "-" + req.files.image.name;

    const filePath = path.join(__dirname, "../uploads", "category", fileName);

    await req.files.image.mv(filePath);

    const imageURL = `http://localhost:5000/uploads/category/${fileName}`;

    req.body.image = imageURL;

    const category = await Category.create(req.body);

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "No such category found." });
    }

    if (!req.body) {
      req.body = {};
    }

    if (req.files && req.files.image) {
      const fileName = Date.now() + "-" + req.files.image.name;
      const filePath = path.josin(
        __dirname,
        "../uploads",
        "category",
        fileName
      );
      await req.files.image.mv(filePath);
      const imageURL = `http://localhost:5000/uploads/category/${fileName}`;

      const oldFileName = path.basename(category.image);
      const folderPath = path.join(__dirname, "../uploads", "category");
      const filesInFolder = await fs.readdir(folderPath);

      if (filesInFolder.includes(oldFileName)) {
        await fs.unlink(path.join(folderPath, oldFileName));
      }

      req.body.image = imageURL;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "No such category found." });
    }

    const fileName = path.basename(category.image);
    const folderPath = path.join(__dirname, "../uploads", "category");
    const filesInFolder = await fs.readdir(folderPath);

    if (filesInFolder.includes(fileName)) {
      const filePath = path.join(folderPath, fileName);
      await fs.unlink(filePath);
    }

    await Category.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
};
