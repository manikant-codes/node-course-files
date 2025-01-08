import React from "react";
import FiltersSidebar from "../../components/public/productsList/FiltersSidebar";
import ProductsList from "../../components/public/productsList/ProductsList";

function Products() {
  return (
    <div className="grid grid-cols-[256px_1fr]">
      {/* Filters Sidebar */}
      <div>
        <FiltersSidebar />
      </div>
      {/* Products List */}
      <div>
        <ProductsList />
      </div>
    </div>
  );
}

export default Products;
