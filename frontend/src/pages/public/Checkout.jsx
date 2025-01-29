import React from "react";
import CartItem from "../../components/public/cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import MyTextInput from "../../components/admin/common/form/MyTextInput";
import { Button } from "flowbite-react";
import { createOrder } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cartSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((store) => {
    return store.cart;
  });

  const [formState, setFormState] = React.useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: ""
  });

  function handleChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (cartItems.length === 0) {
      return alert("Cart is empty.");
    }

    if (
      !formState.line1.trim() ||
      !formState.city.trim() ||
      !formState.state.trim() ||
      !formState.postalCode.trim()
    ) {
      return alert("Please fill in all the fields.");
    }

    const cartItemsFinal = cartItems.map((item) => {
      return {
        product: item._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      };
    });

    const formData = {
      shippingAddress: formState,
      orderItems: cartItemsFinal
    };

    const result = await createOrder(formData);

    if (!result.success) {
      alert(result.msg);
      return;
    }

    dispatch(clearCart());

    alert("Order placed successfully.");

    window.location.href = result.data.sessionURL;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="bg-gray-100 p-8 border border-gray-300 rounded-lg mb-4">
        <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
        <div>
          {cartItems.map((product, index) => {
            return (
              <CartItem key={product._id} product={product} index={index} />
            );
          })}
          <p className="mt-4 flex justify-between font-semibold">
            <span>Total:</span> <span>₹{total}</span>
          </p>
        </div>
      </div>
      <div className="bg-gray-100 p-8 border border-gray-300 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <MyTextInput
            name="line1"
            label="Address Line 1"
            value={formState.line1}
            onChange={handleChange}
            required
          />
          <MyTextInput
            name="line2"
            label="Address Line 2"
            value={formState.line2}
            onChange={handleChange}
          />
          <div className="grid grid-cols-3 gap-4">
            <MyTextInput
              name="city"
              label="City"
              value={formState.city}
              onChange={handleChange}
              required
            />
            <MyTextInput
              name="state"
              label="State"
              value={formState.state}
              onChange={handleChange}
              required
            />
            <MyTextInput
              name="postalCode"
              label="Postal Code"
              value={formState.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Place Order</Button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
