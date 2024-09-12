import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import {
  deleteCategory,
  getAllCategories
} from "../../../services/apiServices";

function CategoriesList() {
  return (
    <div>
      <AdminPageTitle
        text="Categories"
        hasBtn
        btnText="Add Category"
        btnLink="/admin/categories/add"
      />
      <div>
        <CommonList
          getAllData={getAllCategories}
          deleteData={deleteCategory}
          entity="categories"
          fields={{ image: "image", title: "name", subTitle: "" }}
        />
      </div>
    </div>
  );
}

export default CategoriesList;
