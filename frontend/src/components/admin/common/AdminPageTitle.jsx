import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { HiMiniPlus } from "react-icons/hi2";

function AdminPageTitle({ title, link }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-gray-700 font-semibold">{title}</h2>
        {link && (
          <Button color="primary" size="sm" as={Link} to={link}>
            <HiMiniPlus className="mr-2 h-5 w-5" />
            Add New
          </Button>
        )}
      </div>
      <hr />
    </div>
  );
}

export default AdminPageTitle;
