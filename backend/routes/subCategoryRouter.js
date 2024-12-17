const express = require("express");
const {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
} = require("../controllers/subCategoryControllers");
const subCategoryRouter = express.Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/:id", getSubCategoryById);
subCategoryRouter.post("/", addSubCategory);
subCategoryRouter.patch("/:id", updateSubCategory);
subCategoryRouter.delete("/:id", deleteSubCategory);

module.exports = subCategoryRouter;
