const { getProductPrice } = require("../helpers/priceHelpers");
const {
  sendErrorResponse,
  sendDataResponse,
  sendSuccessResponse
} = require("../helpers/resHelpers");
const Order = require("../models/Order");
const Product = require("../models/Product");
console.log("process.env.STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const orderItems = [
//   { product: "adsadadad", price: 1000, quantity: 2, size: "m", color: "red" },
//   { product: "adsadadad", price: 2000, quantity: 1, size: "m", color: "red" }
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
        name: product.name,
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

    // Stripe Checkout Session
    const FRONTEND_BASE_URL = "http://localhost:5173";
    const line_items = orderItemsFinal.map((orderItemObject) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: orderItemObject.name
          },
          unit_amount: orderItemObject.price * 100
        },
        quantity: orderItemObject.quantity
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${FRONTEND_BASE_URL}/checkout/success?id=${order._id}`,
      cancel_url: `${FRONTEND_BASE_URL}/checkout/failure?id=${order._id}`
    });

    sendDataResponse(res, { order, sessionURL: session.url });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return sendErrorResponse(res, "No such order found.", 404);
    }

    if (order.orderStatus === "Pending") {
      if (orderStatus !== "Confirmed" && orderStatus !== "Cancelled") {
        return sendErrorResponse(res, "Invalid order status", 400);
      }
    } else if (order.orderStatus === "Confirmed") {
      if (orderStatus !== "Dispatched" && orderStatus !== "Cancelled") {
        return sendErrorResponse(res, "Invalid order status", 400);
      }
    } else if (order.orderStatus === "Dispatched") {
      if (orderStatus !== "Shipped" && orderStatus !== "Cancelled") {
        return sendErrorResponse(res, "Invalid order status", 400);
      }
    } else if (order.orderStatus === "Shipped") {
      if (orderStatus !== "Delivered" && orderStatus !== "Cancelled") {
        return sendErrorResponse(res, "Invalid order status", 400);
      }
    } else if (order.orderStatus === "Delivered") {
      if (orderStatus !== "Cancelled") {
        return sendErrorResponse(res, "Invalid order status", 400);
      }
    } else {
      return sendErrorResponse(res, "Invalid order status", 400);
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    sendSuccessResponse(res, "Order status updated successfully.");
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
