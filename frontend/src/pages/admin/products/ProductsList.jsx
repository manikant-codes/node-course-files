import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyCommonList from "../../../components/common/MyCommonList";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";

function ProductsList() {
  return (
    <div>
      <AdminPageTitle title="Products" link="/admin/products/add" />
      <div>
        <MyCommonList getAllData={getAllProducts} deleteData={deleteProduct} />
      </div>
    </div>
  );
}

export default ProductsList;
