const express = require("express");
const {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategoriesByCategorySlug,
  getAllSubCategoriesByCategoryId
} = require("../controllers/subCategoryControllers");
const { adminAuthMiddleware } = require("../middlewares/authMiddlewares");
const subCategoryRouter = express.Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/category/:categoryId", getAllSubCategoriesByCategoryId);
subCategoryRouter.get(
  "/category/slug/:categorySlug",
  getAllSubCategoriesByCategorySlug
);
subCategoryRouter.get("/:id", getSubCategoryById);
subCategoryRouter.post("/", adminAuthMiddleware, addSubCategory);
subCategoryRouter.patch("/:id", adminAuthMiddleware, updateSubCategory);
subCategoryRouter.delete("/:id", adminAuthMiddleware, deleteSubCategory);

module.exports = subCategoryRouter;
