const Page = require("../models/Page");
const { addFiles, deleteFiles, addSingleFile } = require("../utils/fileUtils");
const {
  successDataRes,
  errorMsgRes,
  successMsgRes,
} = require("../utils/responseUtils");
const pageValidator = require("../validators/pagesValidators");
const path = require("path");

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getPage = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("id", id);

    const page = await Page.findById(id);

    if (!page) {
      return res
        .status(404)
        .json({ success: false, msg: "No such page found!" });
    }

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const page = await Page.findOne({ slug: slug }).populate("subCategories");

    if (!page) {
      return res
        .status(404)
        .json({ success: false, msg: "No such page found!" });
    }

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addPage = async (req, res) => {
  try {
    await pageValidator(req.body, req.files);

    req.body.images = await addFiles(req.files.images, "pages");

    const page = await Page.create(req.body);

    successDataRes(res, page);
  } catch (error) {
    errorMsgRes(res, error.message, error.status || 500);
  }
};

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPage = await Page.findById(id);

    if (!existingPage) {
      return errorMsgRes(res, "No such page found!", 404);
    }

    await pageValidator(req.body, req.files);

    if (!req.body.images) {
      req.body.images = [];
    } else if (req.body.images && !Array.isArray(req.body.images)) {
      req.body.images = [req.body.images];
    }

    const images = [];

    if (req.files?.images) {
      if (Array.isArray(req.files.images)) {
        const urls = await addFiles(req.files.images, "pages");
        images.concat(urls);
      } else {
        const url = await addSingleFile(req.files.images, "pages");
        images.push(url);
      }
    }

    await deleteFiles(existingPage.images, "pages", req.body.images);

    const updatedPage = await Page.findByIdAndUpdate(id, {
      ...req.body,
      images: [...images, ...req.body.images],
    });

    successDataRes(res, updatedPage);
  } catch (error) {
    errorMsgRes(res, error.message, error.status || 500);
  }
};

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return errorMsgRes(res, "No such page found!", 404);
    }

    await deleteFiles(page.images, "pages");

    await Page.findByIdAndDelete(id);

    successMsgRes(res, "Page deleted successfully!");
  } catch (error) {
    errorMsgRes(res, error.message, error.status || 500);
  }
};

module.exports = {
  getAllPages,
  getPage,
  getPageBySlug,
  addPage,
  updatePage,
  deletePage,
};
