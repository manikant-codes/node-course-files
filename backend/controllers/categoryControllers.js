const {
  sendErrorResponse,
  sendDataResponse
} = require("../helpers/resHelpers");
const Category = require("../models/Category");
const path = require("path");
const fs = require("fs/promises");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    sendDataResponse(res, categories);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return sendErrorResponse(res, "No such category found.", 404);
    }

    sendDataResponse(res, category);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addCategory = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return sendErrorResponse(res, "Category image is required.", 400);
    }

    const fileName = Date.now() + "-" + req.files.image.name;
    const filePath = path.join(__dirname, "../uploads", "category", fileName);
    await req.files.image.mv(filePath);
    const imageURL = `http://localhost:5000/uploads/category/${fileName}`;

    const category = await Category.create({
      name: req.body.name,
      slug: req.body.slug,
      image: imageURL
    });

    sendDataResponse(res, category);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return sendErrorResponse(res, "No such category found.", 404);
    }

    if (!req.body) {
      req.body = {};
    }

    if (req.files && req.files.image) {
      const folderPath = path.join(__dirname, "../uploads", "category");

      const fileName = Date.now() + "-" + req.files.image.name;
      const filePath = path.join(folderPath, fileName);
      await req.files.image.mv(filePath);
      const imageURL = `http://localhost:5000/uploads/category/${fileName}`;

      const toBeDeletedFileName = path.basename(category.image);
      const filesInFolder = await fs.readdir(folderPath);
      if (filesInFolder.includes(toBeDeletedFileName)) {
        await fs.unlink(filePath);
      }

      req.body.image = imageURL;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true
    });

    sendDataResponse(res, updatedCategory);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return sendErrorResponse(res, "No such category found.", 404);
    }

    const fileName = path.basename(category.image);
    const folderPath = path.join(__dirname, "../uploads", "category");
    const filesInFolder = await fs.readdir(folderPath);

    if (filesInFolder.includes(fileName)) {
      await fs.unlink(path.join(folderPath, fileName));
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    sendDataResponse(res, deletedCategory);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
};
