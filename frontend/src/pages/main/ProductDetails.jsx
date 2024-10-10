import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../services/apiServices";
import { getDiscountedPrice } from "../../helpers/priceHelper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { Button } from "@mui/material";
import DiscountedPrice from "../../components/main/common/DiscountedPrice";
import Rating from "../../components/main/common/Rating";
import SizeSelect from "../../components/main/common/SizeSelect";
import ColorSelect from "../../components/main/common/ColorSelect";
import TrendingProducts from "../../components/main/page/TrendingProducts";

function ProductDetails() {
  const { slugProduct } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductBySlug(slugProduct)
      .then((data) => {
        setProduct(data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  if (!product) return null;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
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
            <SizeSelect />
            <ColorSelect />
          </div>
          <div className="flex gap-2 items-center">
            <Button startIcon={<FavoriteBorderIcon />} variant="outlined">
              Wishlist
            </Button>
            <Button startIcon={<LocalMallIcon />} variant="contained">
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
