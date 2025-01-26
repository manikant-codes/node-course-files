const express = require("express");
const {
  getAllOrders,
  getAllUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} = require("../controllers/orderContollers");
const {
  adminAuthMiddleware,
  authMiddleware
} = require("../middlewares/authMiddlewares");
const orderRouter = express.Router();

orderRouter.get("/", adminAuthMiddleware, getAllOrders);
orderRouter.get("/:userId", authMiddleware, getAllUserOrders);
orderRouter.get("/:id", authMiddleware, getOrderById);
orderRouter.post("/", authMiddleware, createOrder);
orderRouter.patch("/:id", authMiddleware, updateOrderStatus);

module.exports = orderRouter;
