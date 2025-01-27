const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    orderItems: {
      type: [orderItemsSchema],
      validate: {
        validator: (orderItems) => {
          if (!orderItems) {
            return false;
          }
          if (!Array.isArray(orderItems)) {
            return false;
          }
          if (orderItems.length === 0) {
            return false;
          }
          return true;
        },
        message: "At least one order item is required."
      },
      required: true
    },
    shippingAddress: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Dispatched",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending"
    },
    orderTotal: { type: Number, required: true },
    paymentId: { type: String }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
