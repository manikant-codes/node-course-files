import { Badge, Box, Button, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Extras({ toggleCart, openProfileMenu, user }) {
  const { cartItems } = useSelector((store) => {
    return store.cart;
  });

  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton onClick={toggleCart} size="large" color="inherit">
        <Badge badgeContent={cartItems.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      {user ? (
        <IconButton
          size="large"
          edge="end"
          onClick={openProfileMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      ) : (
        <Button LinkComponent={Link} to="/signin" variant="" color="secondary">
          Log In / Sign Up
        </Button>
      )}
    </Box>
  );
}

export default Extras;
