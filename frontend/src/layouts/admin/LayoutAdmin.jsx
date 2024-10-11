import { Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import DrawerAdmin from "./DrawerAdmin";
import NavbarAdmin from "./NavbarAdmin";

function LayoutAdmin() {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavbarAdmin toggleDrawer={toggleDrawer} />
      <Toolbar />
      <div className="flex">
        <DrawerAdmin open={open} toggleDrawer={toggleDrawer} />
        <div className="p-8 grow-[1]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default LayoutAdmin;
