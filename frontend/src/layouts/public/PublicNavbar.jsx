import React, { useEffect } from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { COMPANY_NAME } from "../../consts";
import { Link, useNavigate } from "react-router-dom";
import { getAllPages, logout } from "../../services/apiServices";
import { toast } from "react-toastify";
import { HiShoppingCart } from "react-icons/hi";
import CartDrawer from "../../components/public/cart/CartDrawer";

function PublicNavbar() {
  const [pages, setPages] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  async function fetchPages() {
    try {
      const result = await getAllPages();

      if (!result.success) {
        toast("Failed to fetch pages.", { type: "error" });
        console.log(result.msg);
        return;
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

  async function handleLogout() {
    try {
      const result = await logout();

      if (!result.success) {
        alert(result.msg);
        return;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Logged out successfully.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
          <Button size="sm" pill className="mr-2" onClick={handleOpen}>
            <span className="flex items-center justify-center">
              <HiShoppingCart className="h-5 w-5" />
            </span>
          </Button>
          {isLoggedIn ? (
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
                <span className="block text-sm">{user.fullName}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              {user.role === "admin" && (
                <Dropdown.Item as={Link} to="/admin">
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item as={Link} to="/user">
                Account
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button size="sm" pill as={Link} to="/login" className="mr-2">
              Login/Register
            </Button>
          )}
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
      <CartDrawer isOpen={isOpen} handleClose={handleClose} />
    </>
  );
}

export default PublicNavbar;
