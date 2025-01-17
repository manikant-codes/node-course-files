const Category = require("../models/Category");
const path = require("path");
const fs = require("fs/promises");
const Product = require("../models/Product");
const Page = require("../models/Page");
const SubCategory = require("../models/SubCategory");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found." });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, msg: "Category image is required." });
    }

    const fileName = Date.now() + "-" + req.files.image.name;
    const uploadPath = path.join(__dirname, "../uploads", "category", fileName);
    await req.files.image.mv(uploadPath);
    const imageURL = `http://localhost:5000/uploads/category/${fileName}`;

    const category = await Category.create({
      ...req.body,
      image: imageURL
    });

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found." });
    }

    if (!req.body) {
      req.body = {};
    }

    if (req.files && req.files.image) {
      const fileName = path.basename(category.image);
      const folderPath = path.join(__dirname, "../uploads", "category");
      const filesInfolder = await fs.readdir(folderPath);

      if (filesInfolder.includes(fileName)) {
        await fs.unlink(path.join(folderPath, fileName));
      }

      console.log("here");

      const newFileName = Date.now() + "-" + req.files.image.name;
      await req.files.image.mv(path.join(folderPath, newFileName));
      const newImageURL = `http://localhost:5000/uploads/category/${newFileName}`;

      req.body.image = newImageURL;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    const subCategory = await SubCategory.findOne({ category: id });
    const product = await Product.findOne({ category: id });
    const page = await Page.findOne({ name: category.name });

    if (product || page || subCategory) {
      return res
        .status(400)
        .json({
          success: false,
          msg: "Category cannot be deleted as it is being used."
        });
    }

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found." });
    }

    const fileName = path.basename(category.image);
    const folderPath = path.join(__dirname, "../uploads", "category");
    const filesInFolder = await fs.readdir(folderPath);

    if (filesInFolder.includes(fileName)) {
      await fs.unlink(path.join(folderPath, fileName));
    }

    await Category.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, msg: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
};
