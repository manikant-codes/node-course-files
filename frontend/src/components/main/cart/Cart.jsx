import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

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

const links = [
  { icon: <DashboardIcon />, text: "Dashboard", to: "/admin" },
  { icon: <CategoryIcon />, text: "Categories", to: "/admin/categories" },
  {
    icon: <CategoryIcon />,
    text: "Subcategories",
    to: "/admin/subCategories"
  },
  { icon: <Inventory2Icon />, text: "Products", to: "/admin/products" },
  { icon: <NoteAddIcon />, text: "Pages", to: "/admin/pages" },
  { icon: <GroupIcon />, text: "Users", to: "/admin/users" },
  { icon: <ReceiptLongIcon />, text: "Orders", to: "/admin/orders" }
];
const extraLinks = [
  {
    icon: <PowerSettingsNewIcon />,
    text: "Logout",
    to: ""
  }
];

export default function Cart({ open, toggleCart }) {
  const theme = useTheme();
  return (
    <>
      <Drawer
        anchor="right"
        variant="temporary"
        open={open}
        onClose={toggleCart}
      >
        <Toolbar />
        <Box>
          <List>
            {links.map((link, index) => (
              <ListItem
                component={NavLink}
                end
                to={link.to}
                key={index}
                disablePadding
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: theme.palette.primary.main
                      }
                    : {};
                }}
              >
                <ListItemButton>
                  <ListItemIcon style={{ color: "inherit" }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {extraLinks.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
