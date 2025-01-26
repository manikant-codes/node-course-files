const { sendErrorResponse } = require("../helpers/resHelpers");
const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    sendDataResponse(res, orders);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getAllUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId });
    sendDataResponse(res, orders);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    sendDataResponse(res, order);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const createOrder = async (req, res) => {
  try {
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllOrders,
  getAllUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
};
