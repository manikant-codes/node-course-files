import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import MessageBox from "../../components/common/MessageBox";
import ProductCard from "../../components/main/common/ProductCard";
import FiltersSidebar from "../../components/main/productsList/FiltersSidebar";
import useFetch from "../../hooks/useFetch";
import { getAllProducts } from "../../services/apiServices";

function ProductsList() {
  const params = useParams();

  const {
    loading,
    data: products,
    error
  } = useFetch(() => {
    const filters = {
      category: params.categorySlug,
      subCategory: params.subCategorySlug
    };
    return getAllProducts(filters);
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <MessageBox />;
  }

  return (
    <div className="grid grid-cols-[250px_1fr] gap-4 p-8 relative">
      <div>
        <FiltersSidebar />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
}

export default ProductsList;
