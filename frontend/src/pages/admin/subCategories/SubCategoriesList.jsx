import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function SubCategoriesList() {
  return (
    <div>
      <AdminPageTitle
        text="Sub-Categories"
        hasBtn
        btnText={"Add Sub-Categories"}
        btnLink="#"
      />
    </div>
  );
}

export default SubCategoriesList;
