import React from "react";
import NavbarMain from "./NavbarMain";
import FooterMain from "./FooterMain";
import { Outlet } from "react-router-dom";

function LayoutMain() {
  return (
    <div>
      <NavbarMain />
      <div className="p-8">
        <Outlet />
      </div>
      <FooterMain />
    </div>
  );
}

export default LayoutMain;
