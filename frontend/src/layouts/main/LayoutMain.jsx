import { useState } from "react";
import { Outlet } from "react-router-dom";
import Cart from "../../components/main/cart/Cart";
import { minHeight } from "../../consts/consts";
import FooterMain from "./FooterMain";
import NavbarMain from "./NavbarMain";

function LayoutMain() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCart() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <NavbarMain toggleCart={toggleCart} />
      <div className={`${minHeight}`}>
        <Cart open={isOpen} toggleCart={toggleCart} />
        <Outlet />
      </div>
      <FooterMain />
    </div>
  );
}

export default LayoutMain;
