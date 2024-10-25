import React from "react";
import Loading from "../../components/common/Loading";
import MessageBox from "../../components/common/MessageBox";
import ProductCard from "../../components/main/common/ProductCard";
import useFetch from "../../hooks/useFetch";
import { getAllProducts } from "../../services/apiServices";

function Home() {
  const { loading, data: products, error } = useFetch(getAllProducts);

  if (loading) {
    return <Loading isFullPage />;
  }

  if (error) {
    return <MessageBox />;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
}

export default Home;
