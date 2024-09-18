import React from "react";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";

function ProductsList() {
  return (
    <div>
      <TitleAdmin
        title="Products"
        btnTxt="Add Product"
        to="/admin/products/add"
      />
    </div>
  );
}

export default ProductsList;
