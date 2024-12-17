const express = require("express");
const {
  getAllPages,
  getPageById,
  addPage,
  updatePage,
  deletePage
} = require("../controllers/pageControllers");

const pageRouter = express.Router();

pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getPageById);
pageRouter.post("/", addPage);
pageRouter.patch("/:id", updatePage);
pageRouter.delete("/:id", deletePage);

module.exports = pageRouter;
