const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryControllers");
const { adminAuthMiddleware } = require("../middlewares/authMiddlewares");
const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", adminAuthMiddleware, addCategory);
categoryRouter.patch("/:id", adminAuthMiddleware, updateCategory);
categoryRouter.delete("/:id", adminAuthMiddleware, deleteCategory);

module.exports = categoryRouter;
