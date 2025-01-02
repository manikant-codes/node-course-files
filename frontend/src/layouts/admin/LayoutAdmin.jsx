import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import FooterAdmin from "./FooterAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { Outlet } from "react-router-dom";

function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <div className="grid grid-cols-[256px_1fr]">
        <SidebarAdmin />
        <Outlet />
      </div>
      <FooterAdmin />
    </div>
  );
}

export default LayoutAdmin;
