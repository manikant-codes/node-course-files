const express = require("express");
const { createOrder } = require("../controllers/ordersControllers");
const { authenticateUser } = require("../middlewares/authentication");
const ordersRouter = express.Router();

ordersRouter.post("/", authenticateUser, createOrder);

module.exports = ordersRouter;
