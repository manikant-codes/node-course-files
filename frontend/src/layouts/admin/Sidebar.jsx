import React from "react";
import { HiGift } from "react-icons/hi2";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { HiMiniDocumentText, HiHome } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";
import { HiMiniTruck } from "react-icons/hi2";
import { HiMiniPower } from "react-icons/hi2";
import { HiSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";

const links = [
  {
    id: 1,
    icon: HiSparkles,
    to: "/admin",
    name: "Dashboard"
  },
  {
    id: 2,
    icon: HiMiniRectangleGroup,
    to: "/admin/categories",
    name: "Categories"
  },
  {
    id: 3,
    icon: HiMiniSquares2X2,
    to: "/admin/subCategories",
    name: "SubCategories"
  },
  {
    id: 4,
    icon: HiGift,
    to: "/admin/products",
    name: "Products"
  },
  {
    id: 51,
    icon: HiHome,
    to: "/admin/homePage",
    name: "Home Page"
  },
  {
    id: 5,
    icon: HiMiniDocumentText,
    to: "/admin/pages",
    name: "Pages"
  },
  {
    id: 6,
    icon: HiMiniUser,
    to: "/admin/users",
    name: "Users"
  },
  {
    id: 7,
    icon: HiMiniTruck,
    to: "/admin/orders",
    name: "Orders"
  },
  {
    id: 8,
    icon: HiMiniPower,
    to: "/",
    name: "Log Out"
  }
];

function SidebarListItem({ icon: Icon, link, name }) {
  return (
    <li>
      <Link
        to={link}
        className="text-lg text-gray-600 hover:text-purple-600 flex items-center gap-2"
      >
        <Icon className="w-5 h-5" />
        <span>{name}</span>
      </Link>
    </li>
  );
}

function Sidebar() {
  return (
    <ul className="border-r border-r-gray-300 flex flex-col gap-6 p-6">
      {links.map((link) => {
        return (
          <SidebarListItem
            key={link.id}
            icon={link.icon}
            link={link.to}
            name={link.name}
          />
        );
      })}
    </ul>
  );
}

export default Sidebar;
