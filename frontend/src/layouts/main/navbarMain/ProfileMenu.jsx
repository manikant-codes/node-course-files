import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../helpers/authHelper";
import { useDispatch } from "react-redux";

function ProfileMenu({ anchorEl, setAnchorEl, closeMobileMenu, user }) {
  const menuId = "profile-menu";
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeMenu = () => {
    setAnchorEl(null);
    closeMobileMenu();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Profile</MenuItem>
      {user?.role === "admin" && (
        <MenuItem
          onClick={() => {
            closeMenu();
            navigate("/admin");
          }}
        >
          Dashboard
        </MenuItem>
      )}
      <MenuItem
        onClick={() => {
          handleLogout(dispatch);
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
}

export default ProfileMenu;
