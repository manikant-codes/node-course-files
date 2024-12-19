import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function AdminPageTitle({ title, btn }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl text-gray-700 font-semibold">{title}</h2>
      {btn && (
        <Button as={Link} to={btn.to}>
          {btn.text}
        </Button>
      )}
    </div>
  );
}

export default AdminPageTitle;
