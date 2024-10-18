const express = require("express");
const {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoriesControllers");
const {
  authenticate,
  authenticateAdmin
} = require("../middlewares/authentication");
const categoriesRouter = express.Router();

categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:id", getCategory);
categoriesRouter.post("/", authenticateAdmin, addCategory);
categoriesRouter.patch("/:id", authenticateAdmin, updateCategory);
categoriesRouter.delete("/:id", authenticateAdmin, deleteCategory);

module.exports = categoriesRouter;
