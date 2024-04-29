const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDashboard,
  getOrders,
  getPayments,
} = require("../controllers/admin");
const router = express.Router();

router.get("/", authMiddleware, getDashboard);

router.get("/orders", authMiddleware, getOrders);

router.get("/payments", authMiddleware, getPayments);

module.exports = router;
