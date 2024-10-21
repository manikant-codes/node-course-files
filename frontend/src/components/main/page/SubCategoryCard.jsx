import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function SubCategoryCard({ subCategory }) {
  const navigate = useNavigate();
  const { categorySlug } = useParams();

  function goToListPage() {
    navigate(`/page/${categorySlug}/${subCategory.slug}`);
  }

  return (
    <div
      onClick={goToListPage}
      className="flex flex-col gap-2 border rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="h-[250px]">
        <img
          src={subCategory.image}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-2">
        <h3 className="text-xl">{subCategory.name}</h3>
      </div>
    </div>
  );
}

export default SubCategoryCard;
