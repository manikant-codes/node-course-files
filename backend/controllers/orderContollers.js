const { getProductPrice } = require("../helpers/priceHelpers");
const {
  sendErrorResponse,
  sendDataResponse
} = require("../helpers/resHelpers");
const Order = require("../models/Order");
const Product = require("../models/Product");

// const cartItems = [
//   { product: "adsadadad", quantity: 2, size: "m", color: "red" },
//   { product: "adsadadad", quantity: 1, size: "m", color: "red" }
// ];

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
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return sendErrorResponse(res, "Order items are required.", 400);
    }

    if (
      !shippingAddress ||
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postalCode
    ) {
      return sendErrorResponse(res, "Shipping address is required.", 400);
    }

    const orderItemsFinal = [];
    let orderTotal = 0;

    for (const orderItem of orderItems) {
      const product = await Product.findById(orderItem.product);
      if (!product) {
        return sendErrorResponse(res, "No such product found.", 400);
      }

      const price = getProductPrice(
        product.price,
        product.taxPercentage,
        product.discountPercentage,
        product.shippingFee
      );

      orderTotal += price * orderItem.quantity;

      orderItemsFinal.push({
        product: product._id,
        price,
        quantity: orderItem.quantity,
        size: orderItem.size,
        color: orderItem.color
      });
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems: orderItemsFinal,
      shippingAddress,
      orderTotal
    });

    sendDataResponse(res, order);
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
