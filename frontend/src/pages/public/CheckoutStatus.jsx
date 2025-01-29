import React, { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { updateOrderStatus } from "../../services/apiServices";
import { Button } from "flowbite-react";

function CheckoutStatus() {
  const { status } = useParams();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("id");

  async function updateOrder() {
    if (status === "success") {
      try {
        const result = await updateOrderStatus(orderId, {
          orderStatus: "Confirmed"
        });

        if (!result.success) {
          alert(result.msg);
          console.log(result.msg);
        }

        alert("Order Confirmed");
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    }
  }

  useEffect(() => {
    updateOrder();
  }, [orderId]);

  if (status === "success") {
    return (
      <div className="p-8">
        <div className="border border-gray-300 p-4 rounded bg-green-50">
          <h3 className="text-2xl mb-2 text-green-700 font-semibold">
            Order Confirmed!
          </h3>
          <p className="mb-8">Your order has been confirmed successfully.</p>
          <Button as={Link} to="/" size="sm" pill className="w-fit">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="border border-gray-300 p-4 rounded bg-red-50">
        <h3 className="text-2xl mb-2 text-red-700 font-semibold">
          Payment Failed!
        </h3>
        <p className="mb-8">Your payment has failed.</p>
        <Button as={Link} to="/" size="sm" pill className="w-fit">
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default CheckoutStatus;
