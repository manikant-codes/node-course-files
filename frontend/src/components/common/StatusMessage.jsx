import React from "react";

import {
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle
} from "react-icons/fa";

const StatusMessage = ({ type, message, customIcon }) => {
  let icon;
  let bgColor;
  let borderColor;

  switch (type) {
    case "loading":
      icon = (
        <FaSpinner className="inline-block text-2xl text-teal-500 mr-2 animate-spin" />
      );
      bgColor = "bg-teal-50";
      borderColor = "border-teal-200";
      break;
    case "error":
      icon = (
        <FaTimesCircle className="inline-block text-2xl text-red-500 mr-2" />
      );
      bgColor = "bg-red-50";
      borderColor = "border-red-200";
      break;
    case "success":
      icon = (
        <FaCheckCircle className="inline-block text-2xl text-green-500 mr-2" />
      );
      bgColor = "bg-green-50";
      borderColor = "border-green-200";
      break;
    case "info":
      icon = (
        <FaInfoCircle className="inline-block text-2xl text-blue-500 mr-2" />
      );
      bgColor = "bg-blue-50";
      borderColor = "border-blue-200";
      break;
    case "warning":
      icon = (
        <FaExclamationTriangle className="inline-block text-2xl text-yellow-500 mr-2" />
      );
      bgColor = "bg-yellow-50";
      borderColor = "border-yellow-200";
      break;
    default:
      icon = customIcon || (
        <FaInfoCircle className="inline-block text-2xl text-teal-500 mr-2" />
      );
      bgColor = "bg-teal-50";
      borderColor = "border-teal-200";
  }

  return (
    <p className={`${bgColor} ${borderColor} p-4 rounded-lg`}>
      {icon}
      {message}
    </p>
  );
};

export default StatusMessage;
