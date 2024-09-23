const Category = require("../models/Category");
const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");
const fs = require("fs/promises");
const path = require("path");

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
    const image = req.files.image;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, msg: "Image is required!" });
    }

    const uniqueFileName = Date.now() + "-" + image.name;
    const uploadPath = path.join(
      __dirname,
      "../uploads/categories",
      uniqueFileName
    );

    await image.mv(uploadPath);

    const addedCategory = await Category.create({
      ...req.body,
      image: `${process.env.BASE_URL}/uploads/categories/${uniqueFileName}`,
    });
    res.status(200).json({ success: true, data: addedCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let body = req.body;

    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json({ success: false, msg: "No such category found!" });
    }

    if (req.files) {
      // Image is updated.
      const image = req.files.image;
      const fileToBeDeleted = path.parse(category.image).base;
      const filesInCategories = await fs.readdir(
        path.join(__dirname, "../uploads/categories")
      );
      if (filesInCategories.includes(fileToBeDeleted)) {
        await fs.unlink(
          path.join(__dirname, "../uploads/categories", fileToBeDeleted)
        );
      }
      const uniqueFileName = Date.now() + "-" + image.name;
      const uploadPath = path.join(
        __dirname,
        "../uploads/categories",
        uniqueFileName
      );
      await image.mv(uploadPath);
      body = {
        ...body,
        image: `${process.env.BASE_URL}/uploads/categories/${uniqueFileName}`,
      };
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, body);
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found!" });
    }

    const product = await Product.findOne({ category: id });
    const subCategory = await SubCategory.findOne({ categoryId: id });

    if (product || subCategory) {
      return res.status(400).json({
        success: false,
        msg: "Cannot delete this category as it is being used in other products or sub-categories!",
      });
    }

    const fileToBeDeleted = path.parse(category.image).base;

    const filesInCategories = await fs.readdir(
      path.join(__dirname, "../uploads/categories")
    );

    if (filesInCategories.includes(fileToBeDeleted)) {
      await fs.unlink(
        path.join(__dirname, "../uploads/categories", fileToBeDeleted)
      );
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "Category deleted!" });
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
