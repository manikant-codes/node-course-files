import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
