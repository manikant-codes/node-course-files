import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { useParams } from "react-router-dom";
import MessageBox from "../../components/common/MessageBox";
import ProductDesc from "../../components/public/productDetails/ProductDesc";
import ProductImages from "../../components/public/productDetails/ProductImages";
import { getProductBySlug } from "../../services/apiServices";

function ProductDetails() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const { productSlug } = useParams();

  console.log("product", product);
  console.log("error", error);
  console.log("loading", loading);

  async function fetchProduct() {
    try {
      const result = await getProductBySlug(productSlug);

      if (!result.success) {
        console.log("Error: ", result.msg);
        setError(result.msg);
        return;
      }

      setProduct(result.data);
    } catch (error) {
      console.log("Error: ", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [productSlug]);

  if (loading) {
    return (
      <div className="p-8">
        <MessageBox
          renderIcon={() => {
            return <Spinner />;
          }}
          message="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <MessageBox icon={HiExclamation} message={error} status="error" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2">
      <ProductImages images={product.images} />
      <ProductDesc product={product} />
    </div>
  );
}

export default ProductDetails;
