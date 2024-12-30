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
        title="Categories"
        btn={{ to: "/admin/categories/add", text: "Add Category" }}
      />
      <div>
        <CommonList
          getData={getAllCategories}
          deleteData={deleteCategory}
          getFieldValues={(entity) => {
            return {
              image: entity.image,
              title: entity.name,
              desc: entity.slug
            };
          }}
        />
      </div>
    </div>
  );
}

export default CategoriesList;
