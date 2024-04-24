const express = require("express");
const {
  getAllTasks,
  getSingleTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const router = express.Router();

router.get("/", getAllTasks);

router.get("/:id", getSingleTask);

router.post("/", addTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
