import React from "react";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <div className="grid grid-cols-[256px_1fr]">
        <AdminSidebar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
      <AdminFooter />
    </>
  );
}

export default AdminLayout;
