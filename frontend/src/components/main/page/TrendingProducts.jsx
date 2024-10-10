import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/apiServices";
import { useParams } from "react-router-dom";
import ProductCard from "../common/ProductCard";

function TrendingProducts() {
  const { slug } = useParams();
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    getAllProducts({
      category: slug,
      trending: true
    })
      .then((data) => {
        setTrending(data.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [slug]);

  if (!trending || !trending.length) return null;

  return (
    <div>
      <h2 className="text-center mt-10 text-3xl">Trending Products</h2>
      <div className="grid grid-cols-4 gap-2 mt-4">
        {trending.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
}

export default TrendingProducts;
