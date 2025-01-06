import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyCommonList from "../../../components/common/MyCommonList";
import { deletePage, getAllPages } from "../../../services/apiServices";

function PagesList() {
  return (
    <div>
      <AdminPageTitle title="Pages" link="/admin/pages/add" />
      <div>
        <MyCommonList
          getAllData={getAllPages}
          deleteData={deletePage}
          getAllFields={(page) => {
            return {
              image: page.images[0],
              title: page.name,
              subTitle: page.slug
            };
          }}
        />
      </div>
    </div>
  );
}

export default PagesList;
