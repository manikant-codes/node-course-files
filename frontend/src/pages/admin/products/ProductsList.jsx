import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";

function ProductsList() {
  return (
    <div>
      <AdminPageTitle
        title="Products"
        btn={{ to: "/admin/products/add", text: "Add Product" }}
      />
      <div>
        <CommonList getData={getAllProducts} deleteData={deleteProduct} />
      </div>
    </div>
  );
}

export default ProductsList;
