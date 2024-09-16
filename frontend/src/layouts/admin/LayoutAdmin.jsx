import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import { Outlet } from "react-router-dom";

function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutAdmin;
