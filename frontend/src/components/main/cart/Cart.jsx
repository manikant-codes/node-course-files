import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import * as React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme)
      }
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme)
      }
    }
  ]
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between"
}));

export default function Cart({ open, toggleCart }) {
  const theme = useTheme();

  const { cartItems, subTotal } = useSelector((store) => {
    return store.cart;
  });

  return (
    <>
      <Drawer
        anchor="right"
        variant="temporary"
        open={open}
        onClose={toggleCart}
      >
        <DrawerHeader className="border-b border-b-gray-200">
          <div className="flex items-center gap-1">
            <ShoppingCartIcon />
            <Typography variant="h6" component="h2">
              Cart
            </Typography>
          </div>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Box>
          <List>
            {cartItems.map((cartItem, index) => {
              return <CartItem key={index} cartItem={cartItem} index={index} />;
            })}
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <span className="inline-flex w-full items-center justify-between">
                    <span>Sub-Total</span>
                    <span>₹{subTotal}</span>
                  </span>
                }
              />
            </ListItem>
            <ListItem>
              <Button
                disabled={!cartItems.length}
                variant="contained"
                className="w-full"
                LinkComponent={Link}
                to="/checkout"
              >
                Checkout
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
