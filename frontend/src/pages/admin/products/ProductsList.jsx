import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";

function ProductsList() {
  function renderImage(item) {
    console.log(item);
    return item.images[0];
  }

  return (
    <div>
      <AdminPageTitle
        text="Products"
        hasBtn
        btnText={"Add Products"}
        btnLink="/admin/products/add"
      />
      <div>
        <CommonList
          getAllData={getAllProducts}
          deleteData={deleteProduct}
          entity="products"
          fields={{ title: "name", subTitle: "desc" }}
          renderImage={renderImage}
        />
      </div>
    </div>
  );
}

export default ProductsList;
