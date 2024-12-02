import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { minHeight } from "../../consts/consts";

function MessageBox({
  status = "failure",
  title = "Something went wrong",
  message = "Please try later, we will fix it soon!",
  actionBtn = {}
}) {
  const isSuccess = status === "success";
  const textColor = isSuccess ? "text-green-700" : "text-red-700";
  const emoji = isSuccess ? ":)" : ":(";
  const { variant = "contained", to = "", text = "" } = actionBtn;

  return (
    <div className={`${minHeight} flex items-center justify-between`}>
      <div className="max-w-[600px] mx-auto p-4 border border-gray-300 rounded">
        <p className={`text-3xl mb-2 ${textColor}`}>
          {title}, {emoji}
        </p>
        <p className="mb-8">{message}</p>
        {actionBtn.text && (
          <Button variant={variant} LinkComponent={Link} to={to}>
            {text}
          </Button>
        )}
      </div>
    </div>
  );
}

export default MessageBox;
