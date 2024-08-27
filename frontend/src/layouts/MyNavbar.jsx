import { Button, Navbar } from "flowbite-react";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { COMPANY_NAME } from "../consts";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar fluid rounded border className="!px-8 !py-4">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {COMPANY_NAME}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button pill as={Link} to="/todo/add">
          <span className="flex items-center gap-2">
            <HiPlus className="h-4 w-4" />
            <span>Add Todo</span>
          </span>
        </Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default MyNavbar;
