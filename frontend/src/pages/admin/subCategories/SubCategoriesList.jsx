import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function SubCategoriesList() {
  return (
    <div>
      <AdminPageTitle
        title="SubCategories"
        btn={{ to: "/admin/subCategories/add", text: "Add SubCategory" }}
      />
    </div>
  );
}

export default SubCategoriesList;
