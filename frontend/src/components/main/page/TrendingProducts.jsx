import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/apiServices";
import { useParams } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import PageRowTitle from "../common/PageRowTitle";

function TrendingProducts() {
  const { categorySlug } = useParams();
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    getAllProducts({
      category: categorySlug,
      trending: true
    })
      .then((data) => {
        setTrending(data.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [categorySlug]);

  if (!trending || !trending.length) return null;

  return (
    <div>
      <PageRowTitle title={"Trending Products"} />
      <div className="grid grid-cols-4 gap-2 mt-4">
        {trending.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
}

export default TrendingProducts;
