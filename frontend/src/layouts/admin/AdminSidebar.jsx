import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { HiSquares2X2 } from "react-icons/hi2";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiGift } from "react-icons/hi2";
import { HiMiniTruck } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";
import { HiMiniPower } from "react-icons/hi2";
import { Link } from "react-router-dom";

const links = [
  { id: 1, name: "Dashboard", to: "/admin", icon: HiSparkles },
  { id: 2, name: "Categories", to: "/admin/categories", icon: HiSquares2X2 },
  {
    id: 3,
    name: "SubCategories",
    to: "/admin/subCategories",
    icon: HiSquare2Stack
  },
  { id: 4, name: "Products", to: "/admin/products", icon: HiGift },
  { id: 5, name: "Orders", to: "/admin/orders", icon: HiMiniTruck },
  { id: 6, name: "Users", to: "/admin/users", icon: HiMiniUser },
  { id: 7, name: "Log Out", to: "/", icon: HiMiniPower }
];

function AdminSidebar() {
  return (
    <ul className="border-r border-r-gray-300 p-4 flex flex-col gap-4">
      {links.map((link) => {
        return (
          <li key={link.id} className="text-gray-700 hover:text-violet-700">
            <Link className="flex items-center gap-2" to={link.to}>
              <link.icon className="h-6 w-6" />
              <span className="text-lg">{link.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default AdminSidebar;
