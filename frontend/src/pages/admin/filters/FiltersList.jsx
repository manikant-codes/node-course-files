import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import { deleteFilter, getAllFilters } from "../../../services/apiServices";

function FiltersList() {
  return (
    <div>
      <AdminPageTitle
        text="Filters"
        hasBtn
        btnText="Add Filter"
        btnLink="/admin/filters/add"
      />
      <div>
        <CommonList
          getAllData={getAllFilters}
          deleteData={deleteFilter}
          entity="filters"
          fields={{ title: "name" }}
        />
      </div>
    </div>
  );
}

export default FiltersList;
