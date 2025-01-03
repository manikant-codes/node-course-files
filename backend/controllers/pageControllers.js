const {
  saveFile,
  saveMultipleFiles,
  deleteMultipleFiles
} = require("../helpers/fileHelper");
const {
  sendErrorResponse,
  sendDataResponse,
  sendSuccessResponse
} = require("../helpers/resHelper");
const Page = require("../models/Page");
const { default: imageSchema } = require("../schemas/imageSchema");
const { default: pageValidationSchema } = require("../schemas/pageSchema");

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    sendDataResponse(res, pages);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getPageById = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return sendErrorResponse(res, "No such page found.", 404);
    }

    sendDataResponse(res, page);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addPage = async (req, res) => {
  try {
    await imageSchema.validate(req.files);
    await pageValidationSchema.validate(req.body);

    if (Array.isArray(req.files.images)) {
      const imageURLs = await saveMultipleFiles(req.files.images, "page");
      req.body.images = imageURLs;
    } else {
      const imageURL = await saveFile(req.files.images, "page");
      req.body.images = [imageURL];
    }

    await pageValidationSchema.validate(req.body);

    const page = await Page.create(req.body);

    sendDataResponse(res, page);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return sendErrorResponse(res, "No such page found.", 404);
    }

    if (!req.body) {
      req.body = {};
    }

    if (!req.body.images) {
      req.body.images = [];
    }

    if (req.files && req.files.images) {
      if (Array.isArray(req.files.images)) {
        const imageURLs = await saveMultipleFiles(req.files.images, "page");
        req.body.images = [...req.body.images, ...imageURLs];
      } else {
        const imageURL = await saveFile(req.files.images, "page");
        req.body.images = [...req.body.images, imageURL];
      }
    }

    await deleteMultipleFiles(page.images, "page", req.body.images);

    const updatedPage = await Page.findByIdAndUpdate(id, req.body, {
      new: true
    });

    sendDataResponse(res, updatedPage);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Page.findById(id);

    if (!page) {
      return sendErrorResponse(res, "No such page found.", 404);
    }

    await deleteMultipleFiles(page.images, "page");

    await Page.findByIdAndDelete(id);

    sendSuccessResponse(res, "Page deleted successfully.");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllPages,
  getPageById,
  addPage,
  updatePage,
  deletePage
};
