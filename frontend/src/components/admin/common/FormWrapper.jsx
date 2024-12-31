import React from "react";
import AdminPageTitle from "./AdminPageTitle";
import { useParams } from "react-router-dom";

function FormWrapper({ title, children }) {
  const { id } = useParams();
  const isAdd = id === "add";
  return (
    <div>
      <AdminPageTitle title={`${isAdd ? "Add" : "Update"} ${title}`} />
      {children}
    </div>
  );
}

export default FormWrapper;
