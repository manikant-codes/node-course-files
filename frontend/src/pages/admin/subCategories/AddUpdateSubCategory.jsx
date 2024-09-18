import React from "react";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import { useParams } from "react-router-dom";

function AddUpdateSubCategory() {
  const { id } = useParams();
  const isAdd = id === "add";
  return (
    <div>
      <TitleAdmin title={(isAdd ? "Add" : "Update") + " Sub-Category"} />
    </div>
  );
}

export default AddUpdateSubCategory;
