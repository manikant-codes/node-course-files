import { Button } from "flowbite-react";
import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AdminPageTitle({ title, link = "" }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl text-gray-700">{title}</h2>
      {link && (
        <Button as={Link} to={link}>
          <FaCirclePlus className="w-5 h-5 mr-2" /> Add New
        </Button>
      )}
    </div>
  );
}

export default AdminPageTitle;
