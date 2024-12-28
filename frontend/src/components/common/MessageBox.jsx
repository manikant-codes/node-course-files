import React from "react";

function MessageBox({ message, renderIcon, icon: Icon, status = "default" }) {
  function getIconClassName() {
    switch (status) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-cyan-500";
    }
  }

  function getIconContainerClassName() {
    switch (status) {
      case "success":
        return "bg-green-100";
      case "warning":
        return "bg-yellow-100";
      case "error":
        return "bg-red-100";
      default:
        return "bg-cyan-100";
    }
  }

  return (
    <div className="w-full flex items-center">
      <div
        className={
          "flex items-center rounded-lg w-full p-4" +
          " " +
          getIconContainerClassName()
        }
      >
        {renderIcon ? (
          renderIcon()
        ) : (
          <Icon className={"h-6 w-6" + " " + getIconClassName()} />
        )}
        <div className="ml-3 font-normal">{message}</div>
      </div>
    </div>
  );
}

export default MessageBox;
