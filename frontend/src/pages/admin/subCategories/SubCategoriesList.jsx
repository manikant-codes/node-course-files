import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import {
  deleteSubCategory,
  getAllSubCategories
} from "../../../services/apiServices";

function SubCategoriesList() {
  return (
    <div>
      <AdminPageTitle
        title="SubCategories"
        btn={{ to: "/admin/subCategories/add", text: "Add SubCategory" }}
      />
      <div>
        <CommonList
          getData={getAllSubCategories}
          deleteData={deleteSubCategory}
        />
      </div>
    </div>
  );
}

export default SubCategoriesList;
