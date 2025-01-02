import React from "react";
import NavbarUser from "./NavbarUser";
import FooterUser from "./FooterUser";
import { Outlet } from "react-router-dom";
import SidebarUser from "./SidebarUser";

function LayoutUser() {
  return (
    <div>
      <NavbarUser />
      <div>
        <SidebarUser />
        <Outlet />
      </div>
      <FooterUser />
    </div>
  );
}

export default LayoutUser;
