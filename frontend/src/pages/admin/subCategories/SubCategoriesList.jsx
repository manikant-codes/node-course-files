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
      <AdminPageTitle title="Sub-Categories" link="add" />
      <CommonList
        getAllData={getAllSubCategories}
        deleteData={deleteSubCategory}
      />
    </div>
  );
}

export default SubCategoriesList;
