import React from "react";
import SubCategoryCard from "./SubCategoryCard";
import PageRowTitle from "../common/PageRowTitle";

function SubCategoriesRow({ page }) {
  return (
    <div>
      <PageRowTitle title={page.title} />
      <div className="grid grid-cols-4 gap-2 mt-4">
        {page.subCategories.map((value) => {
          return <SubCategoryCard subCategory={value} />;
        })}
      </div>
    </div>
  );
}

export default SubCategoriesRow;
