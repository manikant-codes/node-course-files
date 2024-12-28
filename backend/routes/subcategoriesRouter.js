const express = require("express");
const {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
} = require("../controllers/subcategoriesControllers");
const subcategoriesRouter = express.Router();

subcategoriesRouter.get("/", getAllSubCategories);
subcategoriesRouter.get("/:id", getSubCategoryById);
subcategoriesRouter.post("/", addSubCategory);
subcategoriesRouter.patch("/:id", updateSubCategory);
subcategoriesRouter.delete("/:id", deleteSubCategory);

module.exports = subcategoriesRouter;
