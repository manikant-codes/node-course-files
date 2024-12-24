const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoriesControllers");
const categoriesRouter = express.Router();

categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:id", getCategoryById);
categoriesRouter.post("/", addCategory);
categoriesRouter.patch("/:id", updateCategory);
categoriesRouter.delete("/:id", deleteCategory);

module.exports = categoriesRouter;
