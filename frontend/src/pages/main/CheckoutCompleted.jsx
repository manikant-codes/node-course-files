import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MessageBox from "../../components/common/MessageBox";
import { updateOrderStatus } from "../../services/apiServices";

function CheckoutCompleted() {
  const params = useParams();

  async function updateStatus() {
    try {
      const data = await updateOrderStatus(params.id, { status: "confirmed" });
    } catch (error) {
      console.log("Failed to update order status!");
    }
  }

  useEffect(() => {
    updateStatus();
  }, []);

  return (
    <div className="p-8">
      <MessageBox
        status="success"
        title="Checkout Completed"
        message="Your order has been placed successfully!"
        actionBtn={{ to: "/", text: "Go to Home" }}
      />
    </div>
  );
}

export default CheckoutCompleted;
