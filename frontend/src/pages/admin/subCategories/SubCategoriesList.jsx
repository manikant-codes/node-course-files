import React from "react";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";

function SubCategoriesList() {
  return (
    <div>
      <TitleAdmin
        title="Sub-Categories"
        btnTxt="Add Sub-Category"
        to="/admin/subCategories/add"
      />
    </div>
  );
}

export default SubCategoriesList;
