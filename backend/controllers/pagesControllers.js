const Page = require("../models/Page");
const { addFiles } = require("../utils/fileUtils");
const { successDataRes, errorMsgRes } = require("../utils/responseUtils");
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

const addPage = async (req, res) => {
  try {
    await pageValidator(req.body, req.files);

    const pathToPages = path.join(__dirname, "../uploads/pages");

    req.body.images = await addFiles(
      req.files.images,
      pathToPages,
      `${process.env.BASE_URL}/uploads/pages`
    );

    const page = await Page.create(req.body);

    successDataRes(res, page);
  } catch (error) {
    errorMsgRes(res, error.message, error.status || 500);
  }
};

const updatePage = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deletePage = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { getAllPages, getPage, addPage, updatePage, deletePage };
