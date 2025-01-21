const express = require("express");
const {} = require("../controllers/homePageControllers");
const {
  getHomePage,
  addHomePage,
  updateHomePage
} = require("../controllers/homePageControllers");
const homePageRouter = express.Router();

homePageRouter.get("/", getHomePage);
homePageRouter.post("/", addHomePage);
homePageRouter.patch("/", updateHomePage);

module.exports = homePageRouter;
