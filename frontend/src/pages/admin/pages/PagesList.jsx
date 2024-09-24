import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function PagesList() {
  return (
    <div>
      <AdminPageTitle
        text="Pages"
        hasBtn
        btnText={"Add Pages"}
        btnLink="/admin/pages/add"
      />
    </div>
  );
}

export default PagesList;
