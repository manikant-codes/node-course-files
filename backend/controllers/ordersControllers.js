const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || !Array.isArray(orderItems) || !orderItems.length) {
      return res
        .status(400)
        .json({ success: false, msg: "No products provided!" });
    }

    if (!shippingAddress) {
      return res
        .status(400)
        .json({ success: false, msg: "No shipping address provided!" });
    }

    let totalAmount = 0;
    const orderItemsWithPrice = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res
          .status(400)
          .json({ success: false, msg: "No such product found!" });
      }

      const discount = (product.price * product.discountPercentage) / 100;
      const discountedPrice = product.price - discount;
      const tax = (discountedPrice * product.taxPercentage) / 100;
      const finalPrice = discountedPrice + tax + product.shippingFee;

      orderItemsWithPrice.push({
        product: item.product,
        qty: item.qty,
        price: finalPrice
      });

      totalAmount += finalPrice * item.qty;
    }

    await Order.create({
      orderItems: orderItemsWithPrice,
      user: req.user.userId,
      totalAmount,
      shippingAddress
    });

    res.status(200).json({ success: true, msg: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { createOrder };
