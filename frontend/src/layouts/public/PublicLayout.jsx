import React from "react";
import { Outlet } from "react-router-dom";
import AdminFooter from "./PublicFooter";
import AdminNavbar from "./PublicNavbar";

function PublicLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <AdminFooter />
    </>
  );
}

export default PublicLayout;
