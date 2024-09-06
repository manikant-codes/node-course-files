import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function ProductsList() {
  return (
    <div>
      <AdminPageTitle
        text="Products"
        hasBtn
        btnText={"Add Products"}
        btnLink="#"
      />
    </div>
  );
}

export default ProductsList;
