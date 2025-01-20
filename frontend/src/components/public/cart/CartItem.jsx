import { Avatar, Button } from "flowbite-react";
import React from "react";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";

function CartItem({ product }) {
  return (
    <li className="flex items-center gap-2 border-b border-b-gray-300 py-4">
      <Avatar img={product.images[0]} rounded />
      <div className="grow-[1]">
        <p className="font-semibold">{product.name}</p>
        <p className="mb-2">{product.price.toLocaleString("en-in")}</p>

        <div className="flex items-center gap-2">
          <Button pill color="light" size="xs">
            <HiMinus />
          </Button>
          <p>{product.quantity}</p>
          <Button pill color="light" size="xs">
            <HiPlus />
          </Button>
        </div>
      </div>
      <Button pill color="failure" size="xs" className="h-fit">
        <HiTrash />
      </Button>
    </li>
  );
}

export default CartItem;
