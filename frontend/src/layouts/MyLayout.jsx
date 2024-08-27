import React from "react";
import { Outlet } from "react-router-dom";
import MyFooter from "./MyFooter";
import MyNavbar from "./MyNavbar";

function MyLayout() {
  return (
    <div>
      <MyNavbar />
      <div className="p-8">
        <Outlet />
      </div>
      <MyFooter />
    </div>
  );
}

export default MyLayout;
