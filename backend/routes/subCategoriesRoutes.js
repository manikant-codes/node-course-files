const express = require("express");
const {
  getAllSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategoriesByCategory,
} = require("../controllers/subCategoriesControllers");

const subCategoriesRouter = express.Router();

subCategoriesRouter.get("/", getAllSubCategories);
subCategoriesRouter.get("/category/:id", getAllSubCategoriesByCategory);
subCategoriesRouter.get("/:id", getSubCategory);
subCategoriesRouter.post("/", addSubCategory);
subCategoriesRouter.patch("/:id", updateSubCategory);
subCategoriesRouter.delete("/:id", deleteSubCategory);

module.exports = subCategoriesRouter;
