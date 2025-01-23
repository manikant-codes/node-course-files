import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function SubCategoryCard({ subCategory, isHomePage }) {
  const navigate = useNavigate();

  function handleNavigate(subCategorySlug) {
    if (isHomePage) {
      return navigate(`/${subCategory.category.slug}/${subCategorySlug}`);
    }
    navigate(`${subCategorySlug}`);
  }

  return (
    <div
      className="border border-gray-300 p-4"
      onClick={() => {
        handleNavigate(subCategory.slug);
      }}
    >
      <img
        src={subCategory.image}
        alt=""
        className="h-[256px] w-full object-cover object-top mb-4"
      />
      <h3 className="text-lg ">{subCategory.name}</h3>
    </div>
  );
}

export default SubCategoryCard;
