import React from "react";

function SubCategoryCard({ subCategory }) {
  return (
    <div className="flex flex-col gap-2 border rounded-lg overflow-hidden cursor-pointer">
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
