import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";

function ProductsList() {
  return (
    <div>
      <AdminPageTitle
        text="Products"
        hasBtn
        btnText={"Add Products"}
        btnLink="#"
      />
      <div>
        <CommonList
          getAllData={getAllProducts}
          deleteData={deleteProduct}
          entity="products"
          fields={{ image: "", title: "", subTitle: "" }}
        />
      </div>
    </div>
  );
}

export default ProductsList;
