import React, { useEffect } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { COMPANY_NAME } from "../../consts";
import { Link } from "react-router-dom";
import { getAllPages } from "../../services/apiServices";
import { toast } from "react-toastify";
import { use } from "react";

function PublicNavbar() {
  const [pages, setPages] = React.useState([]);

  async function fetchPages() {
    try {
      const result = await getAllPages();

      if (!result.success) {
        toast("Failed to fetch pages.", { type: "error" });
        console.log(result.msg);
      }

      const temp = result.data.map((page) => {
        return {
          id: page._id,
          name: page.name,
          slug: page.slug
        };
      });

      setPages(temp);
    } catch (error) {
      toast("Failed to fetch pages.", { type: "error" });
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchPages();
  }, []);

  console.log("pages", pages);

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
          <Dropdown.Item as={Link} to="/admin">
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/user">
            Account
          </Dropdown.Item>
          <Dropdown.Item>Log Out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/">
          Home
        </Navbar.Link>
        {pages.map((page) => (
          <Navbar.Link key={page.id} as={Link} to={`/${page.slug}`}>
            {page.name}
          </Navbar.Link>
        ))}
        <Navbar.Link as={Link} to="/contact">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default PublicNavbar;
