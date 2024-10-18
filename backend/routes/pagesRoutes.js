const express = require("express");
const {
  getAllPages,
  getPage,
  addPage,
  updatePage,
  deletePage,
  getPageBySlug
} = require("../controllers/pagesControllers");
const { authenticateAdmin } = require("../middlewares/authentication");
const pagesRouter = express.Router();

pagesRouter.get("/", getAllPages);
pagesRouter.get("/:id", getPage);
pagesRouter.get("/single/:slug", getPageBySlug);
pagesRouter.post("/", authenticateAdmin, addPage);
pagesRouter.patch("/:id", authenticateAdmin, updatePage);
pagesRouter.delete("/:id", authenticateAdmin, deletePage);

module.exports = pagesRouter;
