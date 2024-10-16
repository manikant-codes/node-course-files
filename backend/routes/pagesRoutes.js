const express = require("express");
const {
  getAllPages,
  getPage,
  addPage,
  updatePage,
  deletePage,
  getPageBySlug
} = require("../controllers/pagesControllers");
const pagesRouter = express.Router();

pagesRouter.get("/", getAllPages);
pagesRouter.get("/slug/:slug", getPageBySlug);
pagesRouter.get("/:id", getPage);
pagesRouter.post("/", addPage);
pagesRouter.patch("/:id", updatePage);
pagesRouter.delete("/:id", deletePage);

module.exports = pagesRouter;
