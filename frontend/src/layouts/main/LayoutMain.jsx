import React from "react";
import NavbarMain from "./NavbarMain";
import FooterMain from "./FooterMain";
import { Outlet } from "react-router-dom";

function LayoutMain() {
  return (
    <div>
      <NavbarMain />
      <Outlet />
      <FooterMain />
    </div>
  );
}

export default LayoutMain;
