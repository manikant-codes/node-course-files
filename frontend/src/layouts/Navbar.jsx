import React from "react";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../consts";

const links = [
  { name: "Home", to: "/" },
  { name: "Add/Update", to: "/user/add" },
];

function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-b-gray-300">
      <h1 className="text-xl font-bold">{COMPANY_NAME}</h1>
      <ul className="flex items-center gap-4">
        {links.map((link) => {
          return (
            <li>
              <Link to={link.to}>{link.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navbar;
