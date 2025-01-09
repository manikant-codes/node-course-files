const express = require("express");
const {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategoriesByCategorySlug
} = require("../controllers/subCategoryControllers");

const subCategoryRouter = express.Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get(
  "/category/:categorySlug",
  getAllSubCategoriesByCategorySlug
);
subCategoryRouter.get("/:id", getSubCategoryById);
subCategoryRouter.post("/", addSubCategory);
subCategoryRouter.patch("/:id", updateSubCategory);
subCategoryRouter.delete("/:id", deleteSubCategory);

module.exports = subCategoryRouter;
