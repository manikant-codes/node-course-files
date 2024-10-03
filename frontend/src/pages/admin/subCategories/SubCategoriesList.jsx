import React from "react";
import CommonList from "../../../components/admin/common/CommonList";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import {
  deleteSubCategory,
  getAllSubCategories,
} from "../../../services/apiServices";

function SubCategoriesList() {
  function showSubTitle(item) {
    return item.category.name;
  }
  return (
    <div>
      <TitleAdmin
        title="Sub-Categories"
        btnTxt="Add Sub-Category"
        to="/admin/subCategories/add"
      />
      <CommonList
        partOfURL={"subCategories"}
        getAllData={getAllSubCategories}
        deleteData={deleteSubCategory}
        fields={{
          title: "name",
          image: "image",
        }}
        showSubTitle={showSubTitle}
      />
    </div>
  );
}

export default SubCategoriesList;
