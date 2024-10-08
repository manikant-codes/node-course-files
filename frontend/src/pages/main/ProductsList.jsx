import React, { useEffect, useState } from "react";
import ProductCard from "../../components/main/common/ProductCard";
import { getAllProducts } from "../../services/apiServices";
import { useParams } from "react-router-dom";

function ProductsList() {
  const params = useParams();
  const [products, setProducts] = useState([]);

  console.log("params", params);

  useEffect(() => {
    const filters = {
      category: params.slug,
      subCategory: params.slugSubCategory
    };
    getAllProducts(filters).then((data) => {
      setProducts(data.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-[250px_1fr] gap-4">
      <div>filters</div>
      <div>
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
}

export default ProductsList;
