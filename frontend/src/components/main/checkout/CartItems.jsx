import { Divider, List, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../cart/CartItem";

function CartItems() {
  const { cartItems, subTotal, tax, shippingFee, total } = useSelector(
    (store) => {
      return store.cart;
    }
  );

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Cart Items
      </Typography>
      <List>
        {cartItems.map((cartItem, index) => {
          return <CartItem key={index} cartItem={cartItem} index={index} />;
        })}
        <Divider />
      </List>
      <ul className="flex flex-col gap-1 rounded mt-4 border border-gray-300 w-full p-4">
        <li>
          <span className="inline-flex w-full items-center justify-between">
            <span>Sub-Total</span>
            <span>₹{subTotal}</span>
          </span>
        </li>
        <li>
          <span className="inline-flex w-full items-center justify-between">
            <span>Tax</span>
            <span>₹{tax}</span>
          </span>
        </li>
        <li>
          <span className="inline-flex w-full items-center justify-between">
            <span>Shipping Fee</span>
            <span>₹{shippingFee}</span>
          </span>
        </li>
        <li>
          <Divider />
        </li>
        <li>
          <span className="inline-flex w-full items-center justify-between">
            <span>Total</span>
            <span>₹{total}</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default CartItems;
