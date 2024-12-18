const {
  saveFile,
  deleteFile,
  saveMultipleFiles
} = require("../helpers/fileHelper");
const { sendErrorResponse, sendDataResponse } = require("../helpers/resHelper");
const Page = require("../models/Page");

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
    if (!req.files || !req.files.images) {
      return sendErrorResponse(res, "Page image is required.", 400);
    }

    if (Array.isArray(req.files.images)) {
      const imageURLs = await saveMultipleFiles(req.files.images, "page");
      req.body.images = imageURLs;
    } else {
      const imageURL = await saveFile(req.files.images, "page");
      req.body.images = [imageURL];
    }

    const page = await Page.create(req.body);

    sendDataResponse(res, page);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updatePage = async (req, res) => {
  try {
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deletePage = async (req, res) => {
  try {
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
