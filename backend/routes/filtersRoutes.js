const express = require("express");
const {
  getAllFilters,
  getFilter,
  addFilter,
  updateFilter,
  deleteFilter
} = require("../controllers/filtersControllers");

const { authenticateAdmin } = require("../middlewares/authentication");

const filtersRouter = express.Router();

filtersRouter.get("/", getAllFilters);
filtersRouter.get("/:id", getFilter);
filtersRouter.post("/", authenticateAdmin, addFilter);
filtersRouter.patch("/:id", authenticateAdmin, updateFilter);
filtersRouter.delete("/:id", authenticateAdmin, deleteFilter);

module.exports = filtersRouter;
