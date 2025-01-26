const express = require("express");
const {
  getAllPages,
  getPageById,
  addPage,
  updatePage,
  deletePage,
  getPageBySlug
} = require("../controllers/pageControllers");
const { adminAuthMiddleware } = require("../middlewares/authMiddlewares");

const pageRouter = express.Router();

pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getPageById);
pageRouter.get("/slug/:slug", getPageBySlug);
pageRouter.post("/", adminAuthMiddleware, addPage);
pageRouter.patch("/:id", adminAuthMiddleware, updatePage);
pageRouter.delete("/:id", adminAuthMiddleware, deletePage);

module.exports = pageRouter;
