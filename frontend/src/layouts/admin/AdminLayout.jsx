import React from "react";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <div className="grid grid-cols-[256px_1fr]">
        <Sidebar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
      <AdminFooter />
    </>
  );
}

export default AdminLayout;
