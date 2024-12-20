import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { getAllCategories } from "../../../services/apiServices";
import { toast } from "react-toastify";
import CommonList from "../../../components/common/CommonList";

function CategoriesList() {
  return (
    <div>
      <AdminPageTitle
        title="Categories"
        btn={{ to: "/admin/categories/add", text: "Add Category" }}
      />
      <div>
        <CommonList getData={getAllCategories} />
      </div>
    </div>
  );
}

export default CategoriesList;
