import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { COMPANY_NAME } from "../../consts";
import { getAllPages } from "../../services/apiServices";

function PublicNavbar() {
  const [pages, setPages] = useState([]);

  async function fetchAllPages() {
    try {
      const result = await getAllPages();

      if (!result.success) {
        toast("Failed to fetch pages.", { type: "error" });
      }
      setPages(result.data);
    } catch (error) {
      toast("Failed to fetch pages.", { type: "error" });
    }
  }

  useEffect(() => {
    fetchAllPages();
  }, []);
  return (
    <Navbar fluid border>
      <Navbar.Brand as={"div"}>
        <img
          src="/logo.png"
          className="mr-3 h-6 sm:h-9"
          alt={`${COMPANY_NAME} Logo`}
        />
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
          <Dropdown.Divider />
          <Dropdown.Item>Log Out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        {pages.map((page) => {
          return (
            <Navbar.Link key={page._id} href={`/${page.slug}`}>
              {page.name}
            </Navbar.Link>
          );
        })}
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default PublicNavbar;
