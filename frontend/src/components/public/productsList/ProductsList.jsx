import { Button, Spinner } from "flowbite-react";
import React, { useEffect } from "react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProductsBySubCategorySlug } from "../../../services/apiServices";
import MessageBox from "../../common/MessageBox";
import ProductListItem from "./ProductListItem";

function ProductsList() {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState("");
  const { slug, subCategorySlug } = useParams();

  async function fetchProducts() {
    try {
      const result = await getAllProductsBySubCategorySlug(subCategorySlug);

      if (!result.success) {
        toast("Failed to fetch products.", { type: "error" });
        console.log("Error: ", result.msg);
        setError(result.msg);
        return;
      }

      setProducts(result.data);
    } catch (error) {
      toast("Failed to fetch products.", { type: "error" });
      console.log("Error: ", error.messasge);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <div className="p-4">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      {/* Bread Crumbs */}
      {/* Products List */}
      {products.length > 0 && (
        <ul className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductListItem
              key={product._id}
              image={product.images[0]}
              name={product.name}
              desc={product.desc}
              price={product.price}
              slug={product.slug}
            />
          ))}
        </ul>
      )}
      {products.length <= 0 && (
        <MessageBox icon={HiExclamation} message="No products found." />
      )}
    </div>
  );
}

export default ProductsList;
