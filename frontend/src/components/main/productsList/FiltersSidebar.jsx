import React from "react";
import SizesFilter from "./SizesFilter";
import ColorsFilter from "./ColorsFilter";
import PriceFilter from "./PriceFilter";

function FiltersSidebar() {
  return (
    <div className="sticky top-0 left-0">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <div className="flex flex-col gap-4">
        <SizesFilter />
        <ColorsFilter />
        <PriceFilter />
      </div>
    </div>
  );
}

export default FiltersSidebar;
