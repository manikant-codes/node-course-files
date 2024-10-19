import MoreIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../../consts/consts";
import { getAllPages } from "../../services/apiServices";
import Extras from "./navbarMain/Extras";
import MobileMenu from "./navbarMain/MobileMenu";
import ProfileMenu from "./navbarMain/ProfileMenu";
import Search from "./navbarMain/Search";

function NavbarMain({ toggleCart }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [pages, setPages] = useState([]);
  const user = useSelector((store) => {
    return store.user.user;
  });

  React.useEffect(() => {
    getAllPages().then((data) => {
      const temp = data.data?.map((value) => {
        return { name: value.name, link: `category/${value.slug}` };
      });
      setPages(temp);
    });
  }, []);

  const openMobileMenu = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const closeMobileMenu = () => {
    setMobileMoreAnchorEl(null);
  };

  const openProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Company Name */}
          <Typography
            variant="h1"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
            fontSize="1.5rem"
          >
            {COMPANY_NAME}
          </Typography>

          {/* Pages Links */}
          <ul className="ml-8 flex items-center gap-4">
            {pages.map((value) => {
              return (
                <li>
                  <Link to={value.link}>{value.name}</Link>
                </li>
              );
            })}
          </ul>

          {/* Used For Space */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          <Search />

          {/* Cart, Profile, etc. in Desktop */}
          <Extras
            toggleCart={toggleCart}
            openProfileMenu={openProfileMenu}
            user={user}
          />

          {/* More Button in Mobile View */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={openMobileMenu} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        closeMobileMenu={closeMobileMenu}
        openProfileMenu={openProfileMenu}
        user={user}
      />
      {user && (
        <ProfileMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          closeMobileMenu={closeMobileMenu}
          user={user}
        />
      )}
    </Box>
  );
}

export default NavbarMain;
