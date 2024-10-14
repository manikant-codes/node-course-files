import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const primaryLinks = [
  {
    icon: <DashboardIcon />,
    text: "Dashboard",
    to: "/admin/dashboard"
  },
  {
    icon: <CategoryIcon />,
    text: "Categories",
    to: "/admin/categories"
  },
  {
    icon: <CategoryIcon />,
    text: "Sub-Categories",
    to: "/admin/subCategories"
  },
  {
    icon: <Inventory2Icon />,
    text: "Products",
    to: "/admin/products"
  },
  {
    icon: <NoteAddIcon />,
    text: "Pages",
    to: "/admin/pages"
  },
  {
    icon: <ReceiptLongIcon />,
    text: "Orders",
    to: "/admin/orders"
  },
  {
    icon: <GroupIcon />,
    text: "Users",
    to: "/admin/users"
  }
];

const secondaryLinks = [
  {
    icon: <PowerSettingsNewIcon />,
    text: "Log Out",
    to: "#"
  }
];

const drawerWidth = 240;

function SidebarAdmin() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        position: "static",
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {primaryLinks.map((link, index) => (
            <ListItem component={Link} to={link.to} key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {secondaryLinks.map((link, index) => (
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
  );
}

export default SidebarAdmin;
