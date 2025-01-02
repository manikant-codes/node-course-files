import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import { deletePage, getAllPages } from "../../../services/apiServices";

function PagesList() {
  return (
    <div>
      <AdminPageTitle
        title="Pages"
        btn={{ to: "/admin/pages/add", text: "Add Page" }}
      />
      <div>
        <CommonList
          getData={getAllPages}
          deleteData={deletePage}
          getFieldValues={(entity) => {
            return {
              image: entity.images[0],
              title: entity.name,
              desc: entity.slug
            };
          }}
        />
      </div>
    </div>
  );
}

export default PagesList;
