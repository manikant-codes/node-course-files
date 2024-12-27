const express = require("express");
const {
  getAllSubcategories,
  getSubcategoryById,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory
} = require("../controllers/subcategoriesControllers");
const subcategoriesRouter = express.Router();

subcategoriesRouter.get("/", getAllSubcategories);
subcategoriesRouter.get("/:id", getSubcategoryById);
subcategoriesRouter.post("/", addSubcategory);
subcategoriesRouter.patch("/:id", updateSubcategory);
subcategoriesRouter.delete("/:id", deleteSubcategory);

module.exports = subcategoriesRouter;
