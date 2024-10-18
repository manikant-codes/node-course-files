const express = require("express");
const {
  getAllSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategoriesByCategory
} = require("../controllers/subCategoriesControllers");
const { authenticateAdmin } = require("../middlewares/authentication");

const subCategoriesRouter = express.Router();

subCategoriesRouter.get("/", getAllSubCategories);
subCategoriesRouter.get("/category/:id", getAllSubCategoriesByCategory);
subCategoriesRouter.get("/:id", getSubCategory);
subCategoriesRouter.post("/", authenticateAdmin, addSubCategory);
subCategoriesRouter.patch("/:id", authenticateAdmin, updateSubCategory);
subCategoriesRouter.delete("/:id", authenticateAdmin, deleteSubCategory);

module.exports = subCategoriesRouter;
