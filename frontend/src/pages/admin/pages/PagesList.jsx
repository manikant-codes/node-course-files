import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import { deletePage, getAllPages } from "../../../services/apiServices";

function PagesList() {
  return (
    <div>
      <AdminPageTitle
        text="Pages"
        hasBtn
        btnText={"Add Pages"}
        btnLink="/admin/pages/add"
      />
      <div>
        <CommonList
          getAllData={getAllPages}
          deleteData={deletePage}
          entity="pages"
          fields={{ title: "name", subTitle: "" }}
          renderImage={(item) => {
            return item.images[0];
          }}
        />
      </div>
    </div>
  );
}

export default PagesList;
