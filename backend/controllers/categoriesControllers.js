const Category = require("../models/Category");
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
    const { body, files } = req;

    if (!files) {
      return res
        .status(400)
        .json({ success: false, msg: "Image is required!" });
    }
    if (!body.name.trim()) {
      return res.status(400).json({ success: false, msg: "Name is required!" });
    }
    if (!body.slug.trim()) {
      return res.status(400).json({ success: false, msg: "Slug is required!" });
    }

    const uniqueName = Date.now() + "-" + files.image.name;
    const uploadPath = path.join(
      __dirname,
      "../uploads/categories",
      uniqueName
    );

    await files.image.mv(uploadPath);

    const image = `http:/localhost:5000/uploads/categories/${uniqueName}`;

    const category = await Category.create({ image, ...body });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCategory = async (req, res) => {};

const deleteCategory = async (req, res) => {};

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
