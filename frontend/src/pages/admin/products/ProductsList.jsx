import React from "react";
import CommonList from "../../../components/admin/common/CommonList";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";
import { generateAPIServices } from "../../../utils/apiServices";

function ProductsList() {
  function showImage(product) {
    return product.images[0];
  }

  return (
    <div>
      <TitleAdmin
        title="Products"
        btnTxt="Add Product"
        to="/admin/products/add"
      />
      <CommonList
        partOfURL={"products"}
        getAllData={getAllProducts}
        deleteData={deleteProduct}
        fields={{
          title: "name"
        }}
        showImage={showImage}
      />
    </div>
  );
}

export default ProductsList;
