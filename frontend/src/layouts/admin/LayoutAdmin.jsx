import React from "react";
import NavbarMain from "./NavbarAdmin";
import FooterMain from "./FooterAdmin";
import { Outlet } from "react-router-dom";

function LayoutAdmin() {
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

export default LayoutAdmin;
