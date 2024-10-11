import React, { useState } from "react";
import NavbarMain from "./NavbarMain";
import FooterMain from "./FooterMain";
import { Outlet } from "react-router-dom";
import Cart from "../../components/main/cart/Cart";
import { Toolbar } from "@mui/material";

function LayoutMain() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCart() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <NavbarMain toggleCart={toggleCart} />
      <Toolbar />
      <div className="p-8">
        <Cart open={isOpen} toggleCart={toggleCart} />
        <Outlet />
      </div>
      <FooterMain />
    </div>
  );
}

export default LayoutMain;
