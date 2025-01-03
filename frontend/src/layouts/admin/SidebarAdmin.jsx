import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaSwatchbook,
  FaIcons,
  FaGift,
  FaFileMedical,
  FaClipboardUser,
  FaTruck
} from "react-icons/fa6";

const links = [
  { id: 1, icon: FaChartLine, to: "/admin", text: "Dashboard" },
  { id: 2, icon: FaIcons, to: "/admin/categories", text: "Categories" },
  {
    id: 3,
    icon: FaSwatchbook,
    to: "/admin/subCategories",
    text: "Sub-Categories"
  },
  { id: 4, icon: FaGift, to: "/admin/products", text: "Products" },
  { id: 5, icon: FaFileMedical, to: "/admin/pages", text: "Pages" },
  { id: 6, icon: FaClipboardUser, to: "/admin/users", text: "Users" },
  { id: 7, icon: FaTruck, to: "/admin/orders", text: "Orders" }
];

function SidebarListItem({ link, icon: Icon, text }) {
  return (
    <li className="py-2 first:pt-0 last:pb-0 text-gray-700 hover:text-teal-700">
      <Link to={link} className="inline-flex items-center gap-2 text-lg">
        <Icon /> <span>{text}</span>
      </Link>
    </li>
  );
}

function SidebarAdmin() {
  return (
    <ul className="p-4 border-r border-r-gray-300">
      {links.map((link) => {
        return (
          <SidebarListItem
            key={link.id}
            link={link.to}
            icon={link.icon}
            text={link.text}
          />
        );
      })}
    </ul>
  );
}

export default SidebarAdmin;
