import React, { useEffect } from "react";
import { getAllProductsBySubCategorySlug } from "../../../services/apiServices";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { FaArrowRight } from "react-icons/fa";

function ProductsList() {
  const [products, setProducts] = React.useState([]);
  const { slug, subCategorySlug } = useParams();
  const navigate = useNavigate();

  function handleGoToDetailsPage(productSlug) {
    navigate(productSlug);
  }

  async function fetchProducts() {
    try {
      const result = await getAllProductsBySubCategorySlug(subCategorySlug);

      if (!result.success) {
        toast("Failed to fetch products.", { type: "error" });
        console.log("Error: ", result.msg);
      }

      setProducts(result.data);
    } catch (error) {
      toast("Failed to fetch products.", { type: "error" });
      console.log("Error: ", error.messasge);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      {/* Title */}
      <h2></h2>
      {/* Bread Crumbs */}
      {/* Products List */}
      <ul className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <li
            onClick={() => {
              handleGoToDetailsPage(product.slug);
            }}
            key={product._id}
            className="border border-gray-300 p-4"
          >
            <img
              src={product.images[0]}
              alt=""
              className="w-full h-[256px] object-cover object-top mb-2"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-500 line-clamp-2 mb-2">{product.desc}</p>
            <p className="text-lg font-semibold flex items-center justify-between">
              <span>₹{product.price.toLocaleString("en-in")}</span>
              <Button size="xs">
                <span>Buy Now</span>
              </Button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
