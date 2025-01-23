const { saveFile, deleteFile } = require("../helpers/fileHelpers");
const {
  sendErrorResponse,
  sendDataResponse
} = require("../helpers/resHelpers");
const HomePage = require("../models/HomePage");
const Page = require("../models/Page");

const getHomePage = async (req, res) => {
  try {
    const homePage = await HomePage.findOne({}).populate({
      path: "subCategories",
      populate: {
        path: "category"
      }
    });
    sendDataResponse(res, homePage);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addHomePage = async (req, res) => {
  try {
    const numberOfHomePage = await HomePage.countDocuments({});

    if (numberOfHomePage > 0) {
      return sendErrorResponse(res, "Home page already exists.", 400);
    }

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

    const homePage = await HomePage.create(req.body);

    sendDataResponse(res, homePage);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateHomePage = async (req, res) => {
  try {
    const homePage = await Page.findOne({});

    if (!homePage) {
      return sendErrorResponse(res, "Home page found.", 404);
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

        for (const imageURL of homePage.images) {
          if (!req.body.images.includes(imageURL)) {
            await deleteFile(imageURL, "page");
          }
        }

        req.body.images = [...req.body.images, ...temp];
      } else {
        const imageURL = await saveFile(req.files.images, "page");
        req.body.images = [...req.body.images, imageURL];

        for (const imageURL of homePage.images) {
          if (!req.body.images.includes(imageURL)) {
            await deleteFile(imageURL, "page");
          }
        }
      }
    }

    const updatedHomePage = await Page.findByIdAndUpdate(
      homePage._id,
      req.body,
      {
        new: true
      }
    );

    sendDataResponse(res, updatedHomePage);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getHomePage,
  addHomePage,
  updateHomePage
};
