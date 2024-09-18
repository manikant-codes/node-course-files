import React from "react";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import { useParams } from "react-router-dom";

function AddUpdateCategory() {
  const { id } = useParams();
  const isAdd = id === "add";

  return (
    <div>
      <TitleAdmin title={(isAdd ? "Add" : "Update") + " Category"} />
    </div>
  );
}

export default AddUpdateCategory;
