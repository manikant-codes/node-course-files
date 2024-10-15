import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../services/apiServices";

import { Button } from "@mui/material";
import ColorSelect from "../../components/main/common/ColorSelect";
import DiscountedPrice from "../../components/main/common/DiscountedPrice";
import Rating from "../../components/main/common/Rating";
import SizeSelect from "../../components/main/common/SizeSelect";
import TrendingProducts from "../../components/main/page/TrendingProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

function ProductDetails() {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getProductBySlug(productSlug)
      .then((data) => {
        setProduct(data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [productSlug]);

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  if (!product) return null;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        <div className="grid grid-cols-2 gap-2">
          {product.images.map((image) => {
            return (
              <div className="h-[250px] w-full overflow-hidden rounded-lg border border-slate-200">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">{product.name}</h2>
          <Rating product={product} />
          <p className="">{product.desc}</p>
          <DiscountedPrice product={product} />
          <div className="flex gap-4">
            <SizeSelect size={size} setSize={setSize} />
            <ColorSelect color={color} setColor={setColor} />
          </div>
          <div className="flex gap-2 items-center">
            <Button startIcon={<FavoriteBorderIcon />} variant="outlined">
              Wishlist
            </Button>
            <Button
              disabled={!size || !color}
              startIcon={<LocalMallIcon />}
              variant="contained"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <TrendingProducts />
    </div>
  );
}

export default ProductDetails;
