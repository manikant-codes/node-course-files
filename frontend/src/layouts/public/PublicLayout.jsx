import React from "react";
import PublicNavbar from "./PublicNavbar";
import { Outlet } from "react-router-dom";
import PublicFooter from "./PublicFooter";

function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <Outlet />
      <PublicFooter />
    </>
  );
}

export default PublicLayout;
