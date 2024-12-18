import React from "react";
import UserNavbar from "./UserNavbar";
import { Outlet } from "react-router-dom";
import UserFooter from "./UserFooter";

function UserLayout() {
  return (
    <>
      <UserNavbar />
      <Outlet />
      <UserFooter />
    </>
  );
}

export default UserLayout;
