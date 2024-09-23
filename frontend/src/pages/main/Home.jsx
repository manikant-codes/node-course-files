import React, { useEffect, useState } from "react";
import ProductCard from "../../components/main/common/ProductCard";
import { getAllProducts } from "../../services/apiServices";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
}

export default Home;
