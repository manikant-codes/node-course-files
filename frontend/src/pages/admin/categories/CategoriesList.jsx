import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function CategoriesList() {
  return (
    <div>
      <AdminPageTitle
        title="Categories"
        btn={{ to: "/admin/categories/add", text: "Add Category" }}
      />
    </div>
  );
}

export default CategoriesList;
