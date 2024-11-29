import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddressForm from "../../components/main/checkout/AddressForm";
import CartItems from "../../components/main/checkout/CartItems";
import { createOrder } from "../../services/apiServices";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Checkout() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: ""
  });
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems } = useSelector((store) => {
    return store.cart;
  });

  async function handleBuy(e) {
    const orderItems = cartItems.map((product) => {
      return { product: product._id, qty: product.qty };
    });
    const shippingAddress = address;

    const data = await createOrder({ orderItems, shippingAddress });
    setClientSecret(data.clientSecret);
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="grid grid-cols-2 gap-8">
        <Box>
          <CartItems />
        </Box>
        <Box>
          <AddressForm address={address} setAddress={setAddress} />
        </Box>
      </div>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
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
