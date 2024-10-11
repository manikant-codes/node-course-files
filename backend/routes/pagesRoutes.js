const express = require("express");
const {
  getAllPages,
  getPage,
  addPage,
  updatePage,
  deletePage
} = require("../controllers/pagesControllers");
const pagesRouter = express.Router();

pagesRouter.get("/", getAllPages);
pagesRouter.get("/:id", getPage);
pagesRouter.post("/", addPage);
pagesRouter.patch("/:id", updatePage);
pagesRouter.delete("/:id", deletePage);

module.exports = pagesRouter;
