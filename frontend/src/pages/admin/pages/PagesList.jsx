import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function PagesList() {
  return (
    <div>
      <AdminPageTitle
        title="Pages"
        btn={{ to: "/admin/pages/add", text: "Add Page" }}
      />
    </div>
  );
}

export default PagesList;
