import React from "react";
import CommonList from "../../../components/admin/common/CommonList";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import { deletePage, getAllPages } from "../../../services/apiServices";

function PagesList() {
  function showImage(page) {
    return page.images[0];
  }

  return (
    <div>
      <TitleAdmin title="Pages" btnTxt="Add Page" to="/admin/pages/add" />
      <CommonList
        partOfURL={"pages"}
        getAllData={getAllPages}
        deleteData={deletePage}
        fields={{
          title: "name"
        }}
        showImage={showImage}
      />
    </div>
  );
}

export default PagesList;
