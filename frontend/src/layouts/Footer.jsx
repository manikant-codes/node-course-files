import React from "react";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../consts";

const links = [
  { name: "Privacy", to: "/privacy" },
  { name: "Contact", to: "/contact" },
];

function Footer() {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-t border-t-gray-300">
      <p>
        &copy; {COMPANY_NAME} {new Date().getFullYear()}
      </p>
      <ul className="flex items-center gap-4">
        {links.map((link, index) => {
          return (
            <li key={index}>
              <Link to={link.to}>{link.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Footer;
