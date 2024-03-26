const express = require("express");
const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require("../controllers/orderControllers");
const {
  authMiddleware,
  permissionMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, permissionMiddleware(["admin"]), getAllOrders);
router.post("/", authMiddleware, createOrder);
router.get("/showAllMyOrders", authMiddleware, getCurrentUserOrders);
router.get("/:id", authMiddleware, getSingleOrder);
router.patch("/:id", authMiddleware, updateOrder);

module.exports = router;
