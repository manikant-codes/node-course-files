const express = require("express");
const {
  getAllPages,
  getPageById,
  addPage,
  updatePage,
  deletePage,
  getPageBySlug
} = require("../controllers/pageControllers");

const pageRouter = express.Router();

pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getPageById);
pageRouter.get("/slug/:slug", getPageBySlug);
pageRouter.post("/", addPage);
pageRouter.patch("/:id", updatePage);
pageRouter.delete("/:id", deletePage);

module.exports = pageRouter;
