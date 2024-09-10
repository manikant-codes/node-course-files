const fs = require("fs/promises");
const path = require("path");
const SubCategory = require("../models/SubCategory");

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
    const image = req.files.image;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, msg: "Image is required!" });
    }

    const uniqueFileName = Date.now() + "-" + image.name;
    const uploadPath = path.join(
      __dirname,
      "../uploads/subCategories",
      uniqueFileName
    );

    await image.mv(uploadPath);

    const addedSubCategory = await SubCategory.create({
      ...req.body,
      image: `${process.env.BASE_URL}/uploads/subCategories/${uniqueFileName}`,
    });
    res.status(200).json({ success: true, data: addedSubCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let body = req.body;

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      res
        .status(404)
        .json({ success: false, msg: "No such sub-category found!" });
    }

    if (req.files) {
      // Image is updated.
      const image = req.files.image;
      const fileToBeDeleted = path.parse(subCategory.image).base;
      const filesInSubCategories = await fs.readdir(
        path.join(__dirname, "../uploads/subCategories")
      );
      if (filesInSubCategories.includes(fileToBeDeleted)) {
        await fs.unlink(
          path.join(__dirname, "../uploads/subCategories", fileToBeDeleted)
        );
      }
      const uniqueFileName = Date.now() + "-" + image.name;
      const uploadPath = path.join(
        __dirname,
        "../uploads/subCategories",
        uniqueFileName
      );
      await image.mv(uploadPath);
      body = {
        ...body,
        image: `${process.env.BASE_URL}/uploads/subCategories/${uniqueFileName}`,
      };
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, body);
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

    const fileToBeDeleted = path.parse(subCategory.image).base;

    const filesInSubCategories = await fs.readdir(
      path.join(__dirname, "../uploads/subCategories")
    );

    if (filesInSubCategories.includes(fileToBeDeleted)) {
      await fs.unlink(
        path.join(__dirname, "../uploads/subCategories", fileToBeDeleted)
      );
    }

    await SubCategory.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "Sub-category deleted!" });
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
