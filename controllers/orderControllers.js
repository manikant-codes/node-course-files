const asyncWrapper = require("../utils/asyncWrapper");
const Product = require("../models/Product");
const Order = require("../models/Order");
const CustomError = require("../services/customError");
const checkPermission = require("../utils/checkPermission");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json({ success: true, data: orders });
});

const getSingleOrder = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    return next(new CustomError("No such order exists!", 404));
  }
  checkPermission(req.user, order.user);
  res.status(200).json({ success: true, data: order });
});

const getCurrentUserOrders = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const orders = await Order.find({ user: id });
  res.status(200).json({ success: true, data: orders });
});

const createOrder = asyncWrapper(async (req, res, next) => {
  const { items, tax, shippingFee } = req.body;

  if (!items || !items.length) {
    return next(new CustomError("No items provided!", 400));
  }

  if (!tax || !shippingFee) {
    return next(new CustomError("No tax or shipping fee provided!", 400));
  }

  let orderItems = [];
  let subtotal = 0;

  for (const i of items) {
    const product = await Product.findOne({ _id: i.product });
    if (!product) {
      return next(
        new CustomError(`No suct product found! Product ID: ${i.product}`, 400)
      );
    }
    const { name, price, image, _id } = product;
    const singleOrderItem = {
      amount: i.amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems.push(singleOrderItem);
    subtotal += i.amount * price;
  }

  const total = tax + shippingFee + subtotal;

  // Get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "inr",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.id,
  });

  res.status(200).json({ success: true, data: order });
});

const updateOrder = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    return next(new CustomError("No such order exists!", 404));
  }
  checkPermission(req.user, order.user);
  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();
  res.status(200).json({ success: true, data: order });
});

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
