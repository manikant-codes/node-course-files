import React from "react";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";

function CategoriesList() {
  return (
    <div>
      <TitleAdmin
        title="Categories"
        btnTxt="Add Category"
        to="/admin/categories/add"
      />
    </div>
  );
}

export default CategoriesList;
