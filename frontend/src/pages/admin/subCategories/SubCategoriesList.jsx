import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import {
  deleteSubCategory,
  getAllSubCategories,
} from "../../../services/apiServices";

function SubCategoriesList() {
  function renderSubtitle(item) {
    return item?.categoryId?.name;
  }

  return (
    <div>
      <AdminPageTitle
        text="Sub-Categories"
        hasBtn
        btnText={"Add Sub-Categories"}
        btnLink="/admin/subCategories/add"
      />
      <div>
        <CommonList
          getAllData={getAllSubCategories}
          deleteData={deleteSubCategory}
          entity="subCategories"
          fields={{ image: "image", title: "name", subTitle: "" }}
          renderSubtitle={renderSubtitle}
        />
      </div>
    </div>
  );
}

export default SubCategoriesList;
