import React from "react";
import { FaSpinner, FaCircleXmark } from "react-icons/fa6";
import {
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";

const StatusMessage = ({ customIcon, type, message }) => {
  let icon;
  let bgColor;
  let borderColor;
  let textColor;

  switch (type) {
    case "loading":
      icon = (
        <FaSpinner className="inline-block text-2xl text-teal-500 mr-2 animate-spin" />
      );
      bgColor = "bg-teal-50";
      borderColor = "border-teal-200";
      textColor = "text-teal-500";
      break;
    case "error":
      icon = (
        <FaCircleXmark className="inline-block text-2xl text-red-500 mr-2" />
      );
      bgColor = "bg-red-50";
      borderColor = "border-red-200";
      textColor = "text-red-500";
      break;
    case "success":
      icon = (
        <FaCheckCircle className="inline-block text-2xl text-green-500 mr-2" />
      );
      bgColor = "bg-green-50";
      borderColor = "border-green-200";
      textColor = "text-green-500";
      break;
    case "info":
      icon = (
        <FaInfoCircle className="inline-block text-2xl text-blue-500 mr-2" />
      );
      bgColor = "bg-blue-50";
      borderColor = "border-blue-200";
      textColor = "text-blue-500";
      break;
    case "warning":
      icon = (
        <FaExclamationTriangle className="inline-block text-2xl text-yellow-500 mr-2" />
      );
      bgColor = "bg-yellow-50";
      borderColor = "border-yellow-200";
      textColor = "text-yellow-500";
      break;
    default:
      icon = customIcon || (
        <FaInfoCircle className="inline-block text-2xl text-teal-500 mr-2" />
      );
      bgColor = "bg-teal-50";
      borderColor = "border-teal-200";
      textColor = "text-teal-500";
  }

  return (
    <p className={`${bgColor} ${borderColor} p-4 rounded-lg`}>
      {icon}
      {message}
    </p>
  );
};

export default StatusMessage;
