import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";
import CommonListItem from "../../../components/common/CommonListItem";

function ProductsList() {
  return (
    <div>
      <AdminPageTitle
        title="Products"
        btn={{ to: "/admin/products/add", text: "Add Product" }}
      />
      <div>
        <CommonList
          getData={getAllProducts}
          deleteData={deleteProduct}
          getFieldValues={(entity) => {
            return {
              image: entity.images[0],
              title: entity.name,
              desc: entity.price.toLocaleString("en-in")
            };
          }}
        />
      </div>
    </div>
  );
}

export default ProductsList;
