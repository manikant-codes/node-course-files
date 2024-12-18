import React from "react";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <AdminFooter />
    </>
  );
}

export default AdminLayout;
