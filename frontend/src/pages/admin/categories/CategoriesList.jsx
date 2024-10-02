import React from "react";
import CommonList from "../../../components/admin/common/CommonList";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import {
  deleteCategory,
  getAllCategories,
} from "../../../services/apiServices";

function CategoriesList() {
  return (
    <div>
      <TitleAdmin
        title="Categories"
        btnTxt="Add Category"
        to="/admin/categories/add"
      />
      <CommonList
        partOfURL={"categories"}
        getAllData={getAllCategories}
        deleteData={deleteCategory}
        fields={{
          title: "name",
          image: "image",
        }}
      />
    </div>
  );
}

export default CategoriesList;
