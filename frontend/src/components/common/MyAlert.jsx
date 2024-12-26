import { Alert } from "flowbite-react";
import React from "react";

function MyAlert({ color = "primary", icon, msg }) {
  return (
    <Alert color={color} icon={icon}>
      <span className="text-gray-700 font-semibold">{msg}</span>
    </Alert>
  );
}

export default MyAlert;
