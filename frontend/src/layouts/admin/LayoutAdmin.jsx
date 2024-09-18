import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import { Toolbar } from "@mui/material";

function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <div className="grid grid-cols-[auto_1fr]">
        <SidebarAdmin />
        <div className="p-8">
          <Toolbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin;
