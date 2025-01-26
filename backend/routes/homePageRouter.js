const express = require("express");
const {} = require("../controllers/homePageControllers");
const {
  getHomePage,
  addHomePage,
  updateHomePage
} = require("../controllers/homePageControllers");
const { adminAuthMiddleware } = require("../middlewares/authMiddlewares");
const homePageRouter = express.Router();

homePageRouter.get("/", getHomePage);
homePageRouter.post("/", adminAuthMiddleware, addHomePage);
homePageRouter.patch("/", adminAuthMiddleware, updateHomePage);

module.exports = homePageRouter;
