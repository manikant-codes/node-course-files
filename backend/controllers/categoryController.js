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
    console.log("req.body", req.body);
    console.log("req.files", req.files);

    const fileName = Date.now() + "-" + req.files.image.name;
    const uploadPath = path.join(__dirname, "../uploads", "category", fileName);

    await req.files.image.mv(uploadPath);

    const imageURL = `http://localhost:5000/uploads/category/${fileName}`;

    const category = await Category.create({
      name: req.body.name,
      slug: req.body.slug,
      image: imageURL
    });

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    res.send("Update Category");
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    res.send("Delete Category");
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
