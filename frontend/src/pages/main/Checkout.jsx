import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddressForm from "../../components/main/checkout/AddressForm";
import CartItems from "../../components/main/checkout/CartItems";

function Checkout() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: ""
  });
  const { cartItems } = useSelector((store) => {
    return store.cart;
  });

  async function handleBuy(e) {
    const orderItems = cartItems.map((product) => {
      return { product: product._id, qty: product.qty };
    });
    const shippingAddress = address;

    const result = await fetch("http://localhost:5000/orders", {
      method: "POST",
      body: JSON.stringify({ orderItems, shippingAddress }),
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await result.json();

    console.log("data", data);
  }

  return (
    <div className="flex flex-col gap-4">
      <Box>
        <CartItems />
      </Box>
      <Box>
        <AddressForm address={address} setAddress={setAddress} />
      </Box>
      <Button
        disabled={!cartItems.length}
        variant="contained"
        className="w-full block"
        LinkComponent={Link}
        onClick={handleBuy}
      >
        Proceed to Buy
      </Button>
    </div>
  );
}

export default Checkout;
