import { Button, Drawer } from "flowbite-react";
import React from "react";
import { HiShoppingCart, HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function CartDrawer({ isOpen, handleClose }) {
  const { cartItems, total } = useSelector((store) => {
    return store.cart;
  });

  return (
    <div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header titleIcon={HiShoppingCart} title="Cart" />
        <Drawer.Items className="list-none flex flex-col">
          {cartItems.map((product, index) => {
            return (
              <CartItem key={product._id} product={product} index={index} />
            );
          })}

          <p className="flex items-center justify-between mt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </p>

          {/* Clear and Checkout Buttons */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <Button color="gray">
              <span className="flex items-center justify-center">Clear</span>
            </Button>
            <Button as={Link} to="/checkout" onClick={handleClose}>
              <span className="flex items-center justify-center">
                Checkout
                <HiArrowRight className="ml-2" />
              </span>
            </Button>
          </div>
        </Drawer.Items>
      </Drawer>
    </div>
  );
}

export default CartDrawer;
