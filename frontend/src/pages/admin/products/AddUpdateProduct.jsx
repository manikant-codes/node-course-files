import React from "react";
import { useParams } from "react-router-dom";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";

function AddUpdateProduct() {
  const { id } = useParams();
  const isAdd = id === "add";
  return (
    <div>
      <TitleAdmin title={(isAdd ? "Add" : "Update") + " Product"} />
    </div>
  );
}

export default AddUpdateProduct;
