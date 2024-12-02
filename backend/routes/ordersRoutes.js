const express = require("express");
const {
  createOrder,
  updateOrderStatus
} = require("../controllers/ordersControllers");
const { authenticateUser } = require("../middlewares/authentication");
const ordersRouter = express.Router();

ordersRouter.post("/", authenticateUser, createOrder);
ordersRouter.patch("/:id", authenticateUser, updateOrderStatus);

module.exports = ordersRouter;
