const {
  addMultipleFiles,
  addFile,
  deleteMultipleFiles
} = require("../helpers/fileHelpers");
const Page = require("../models/Page");
const Product = require("../models/Product");
const { pagesValidator } = require("../validators/pagesValidator");

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find().populate("subCategories");
    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const getPage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return res
        .status(404)
        .json({ success: false, msg: "No such page found!" });
    }

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const addPage = async (req, res) => {
  try {
    pagesValidator(req.files, req.body);

    if (Array.isArray(req.files?.images)) {
      const imagesURL = await addMultipleFiles(req.files.images, "pages");
      req.body.images = imagesURL;
    } else {
      const imageURL = await addFile(req.files.images, "pages");
      req.body.images = [imageURL];
    }

    const page = await Page.create(req.body);

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const updatePage = async (req, res) => {
  try {
    pageValidator(req.files, req.body);
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return res.status(404).json({ success: false, msg: "No such page!" });
    }

    if (!req.body.images) {
      req.body.images = [];
    } else if (req.body.images && !Array.isArray(req.body.images)) {
      req.body.images = [req.body.images];
    }

    await deleteMultipleFiles(page.images, "pages", req.body.images);

    if (req.files) {
      if (Array.isArray(req.files.images)) {
        const imagesURL = await addMultipleFiles(req.files.images, "products");
        req.body.images = [...req.body.images, ...imagesURL];
      } else {
        const imageURL = await addFile(req.files.images, "products");
        req.body.images = [...req.body.images, imageURL];
      }
    }

    const updatedPage = await Page.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.status(200).json({ success: true, data: updatedPage });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return res
        .status(404)
        .json({ success: false, msg: "No such page found!" });
    }

    await deleteMultipleFiles(page.images, "pages");

    await Page.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "Page deleted successfully!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllPages,
  getPage,
  addPage,
  updatePage,
  deletePage
};
