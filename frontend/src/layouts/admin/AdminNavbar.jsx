import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { COMPANY_NAME } from "../../consts";
import { Link } from "react-router-dom";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A simple navbar component for the admin layout.
 *
 * It includes a brand image and link, as well as a dropdown
 * menu with the user's name and email, and options for home
 * and logout.
 *
 * The navbar is responsive and will collapse to a hamburger
 * menu on smaller screens.
 */
/******  f83a35c4-44dc-444a-a46b-1bb9db44a889  *******/function AdminNavbar() {
  return (
    <Navbar fluid border>
      <Navbar.Brand href="/">
        <img
          src="/cart-logo-new.jpg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {COMPANY_NAME}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item as={Link} to="/">
            Home
          </Dropdown.Item>
          <Dropdown.Item>Log Out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default AdminNavbar;
