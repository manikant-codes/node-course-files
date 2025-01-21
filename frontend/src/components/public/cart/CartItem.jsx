import { Avatar, Button } from "flowbite-react";
import React from "react";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart
} from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { getDiscountedPrice } from "../../../helpers/priceHelper";

function CartItem({ product, index }) {
  const dispatch = useDispatch();
  function handleRemove() {
    dispatch(removeFromCart(index));
  }

  function handleIncrease() {
    dispatch(increaseQuantity(index));
  }

  function handleDecrease() {
    dispatch(decreaseQuantity(index));
  }

  return (
    <li className="flex items-center gap-2 border-b border-b-gray-300 py-4">
      <Avatar img={product.images[0]} rounded />
      <div className="grow-[1]">
        <p className="font-semibold">{product.name}</p>
        <p className="mb-2">
          ₹
          {getDiscountedPrice(
            product.price,
            product.taxPercentage,
            product.discountPercentage
          ).toLocaleString("en-in")}
        </p>

        <div className="flex items-center gap-2">
          <Button onClick={handleDecrease} pill color="light" size="xs">
            <HiMinus />
          </Button>
          <p>{product.quantity}</p>
          <Button onClick={handleIncrease} pill color="light" size="xs">
            <HiPlus />
          </Button>
        </div>
      </div>
      <Button
        onClick={handleRemove}
        pill
        color="failure"
        size="xs"
        className="h-fit"
      >
        <HiTrash />
      </Button>
    </li>
  );
}

export default CartItem;
