import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function ProductsList() {
  return (
    <div>
      <AdminPageTitle
        title="Products"
        btn={{ to: "/admin/products/add", text: "Add Product" }}
      />
    </div>
  );
}

export default ProductsList;
