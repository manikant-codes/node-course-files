const Subcategory = require("../models/Subcategories");
const path = require("path");
const fs = require("fs/promises");

const getAllSubcategories = async () => {
  try {
    const subcategories = await Subcategory.find();
    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSubcategoryById = async () => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findById(id);

    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such subcategory found." });
    }

    res.status(200).json({ success: true, data: subcategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addSubcategory = async () => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, message: "Subcategory image is required." });
    }

    const fileName = Date.now() + "-" + req.files.image.name;
    const filePath = path.join(
      __dirname,
      "../uploads",
      "subcategory",
      fileName
    );
    await req.files.image.mv(filePath);
    const imageURL = `http://localhost:5000/uploads/subcategory/${fileName}`;

    req.body.image = imageURL;

    const subcategory = await Subcategory.create(req.body);
    res.status(200).json({ success: true, data: subcategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSubcategory = async () => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findById(id);

    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such subcategory found." });
    }

    if (!req.body) {
      req.body = {};
    }

    if (req.files && req.files.image) {
      const fileName = Date.now() + "-" + req.files.image.name;
      const filePath = path.join(
        __dirname,
        "../uploads",
        "subcategory",
        fileName
      );
      await req.files.image.mv(filePath);
      const imageURL = `http://localhost:5000/uploads/subcategory/${fileName}`;

      const oldFileName = path.basename(subcategory.image);
      const folderPath = path.join(__dirname, "../uploads", "subcategory");
      const filesInFolder = await fs.readdir(folderPath);

      if (filesInFolder.includes(oldFileName)) {
        await fs.unlink(path.join(folderPath, oldFileName));
      }

      req.body.image = imageURL;
    }

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedSubcategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSubcategory = async () => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findById(id);

    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such subcategory found." });
    }

    const fileName = path.basename(subcategory.image);
    const folderPath = path.join(__dirname, "../uploads", "subcategory");
    const filesInFolder = await fs.readdir(folderPath);

    if (filesInFolder.includes(fileName)) {
      await fs.unlink(path.join(folderPath, fileName));
    }

    await Subcategory.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Subcategory deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllSubcategories,
  getSubcategoryById,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory
};
