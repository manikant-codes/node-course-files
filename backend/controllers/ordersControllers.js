const Order = require("../models/Order");
const Product = require("../models/Product");
const stripe = require("stripe")(process.env.STRIPE_KEY);

// [
//   {
//     price_data: {
//       currency: "usd",
//       unit_amount: 500,
//       product_data: {
//         name: "name of the product"
//       }
//     },
//     quantity: 1
//   }
// ];

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
    const lineItems = [];

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

      lineItems.push({
        quantity: item.qty,
        price_data: {
          currency: "usd",
          unit_amount: finalPrice * 100,
          product_data: {
            name: product.name
          }
        }
      });

      totalAmount += finalPrice * item.qty;
    }

    const order = await Order.create({
      orderItems: orderItemsWithPrice,
      user: req.user.userId,
      totalAmount,
      shippingAddress
    });

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: lineItems,
      mode: "payment",
      return_url: `http://localhost:3000/checkoutCompleted/${order._id}`
    });

    res.status(200).json({
      success: true,
      msg: "Order places successfully!",
      clientSecret: session.client_secret
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    console.log("status", status);
    console.log("order.status", order.status);

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: "No such order found!"
      });
    }

    if (order.status === "pending") {
      if (status !== "confirmed" && status !== "cancelled") {
        return res.status(400).json({
          success: false,
          msg: `Cannot change the status to ${status}!`
        });
      }
    } else if (order.status === "confirmed") {
      if (status !== "dispatched" && status !== "cancelled") {
        return res.status(400).json({
          success: false,
          msg: `Cannot change the status to ${status}!`
        });
      }
    } else if (order.status === "dispatched") {
      if (status !== "delivered" && status !== "cancelled") {
        return res.status(400).json({
          success: false,
          msg: `Cannot change the status to ${status}!`
        });
      }
    } else if (order.status === "delivered") {
      if (status !== "cancelled") {
        return res.status(400).json({
          success: false,
          msg: `Cannot change the status to ${status}!`
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        msg: `Cannot change the status to ${status}!`
      });
    }

    await Order.findByIdAndUpdate(id, { status });

    res.status(200).json({
      success: true,
      msg: "Order status updated successfully!"
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { createOrder, updateOrderStatus };
