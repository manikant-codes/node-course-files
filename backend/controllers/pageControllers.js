const { saveFile, deleteFile } = require("../helpers/fileHelpers");
const {
  sendErrorResponse,
  sendDataResponse
} = require("../helpers/resHelpers");
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

const getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const page = await Page.findOne({ slug }).populate("subCategories");

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
      const temp = [];
      for (const image of req.files.images) {
        const imageURL = await saveFile(image, "page");
        temp.push(imageURL);
      }
      req.body.images = temp;
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
        const temp = [];
        for (const imageFile of req.files.images) {
          const imageURL = await saveFile(imageFile, "page");
          temp.push(imageURL);
        }

        for (const imageURL of page.images) {
          if (!req.body.images.includes(imageURL)) {
            await deleteFile(imageURL, "page");
          }
        }

        req.body.images = [...req.body.images, ...temp];
      } else {
        const imageURL = await saveFile(req.files.images, "page");
        req.body.images = [...req.body.images, imageURL];

        for (const imageURL of page.images) {
          if (!req.body.images.includes(imageURL)) {
            await deleteFile(imageURL, "page");
          }
        }
      }
    }

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

    for (const imageURL of page.images) {
      await deleteFile(imageURL, "page");
    }

    await Page.findByIdAndDelete(id);

    sendDataResponse(res, null);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllPages,
  getPageById,
  getPageBySlug,
  addPage,
  updatePage,
  deletePage
};
