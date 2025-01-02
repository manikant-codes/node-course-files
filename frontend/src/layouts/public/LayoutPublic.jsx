import React from "react";
import NavbarPublic from "./NavbarPublic";
import FooterPublic from "./FooterPublic";
import { Outlet } from "react-router-dom";

function LayoutPublic() {
  return (
    <div>
      <NavbarPublic />
      <Outlet />
      <FooterPublic />
    </div>
  );
}

export default LayoutPublic;
