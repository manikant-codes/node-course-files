const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getStats } = require("../controllers/dashboardControllers");
const router = express.Router();

router.get("/", authMiddleware, getStats);

module.exports = router;
