import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../services/apiServices";
import { getDiscountedPrice } from "../../helpers/priceHelper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";

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
    <div className="grid grid-cols-2 gap-4">
      <div className="grid grid-cols-2 gap-2">
        {product.images.map((image) => {
          return (
            <div className="h-[250px] w-full overflow-hidden rounded-lg border border-slate-200">
              <img src={image} alt="" className="h-full w-full object-cover" />
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <StarIcon className="!h-5 !w-5" /> 4.6
          </div>
          <div className="">|</div>
          <div className="index-ratingsCount">15.9k Ratings</div>
        </div>
        <p className="mb-4">{product.desc}</p>
        <p className="flex gap-2 items-baseline mb-4">
          <span className="text-2xl">
            ₹
            {getDiscountedPrice(
              product.price,
              product.discountPercentage
            ).toLocaleString("en-in")}
          </span>
          <span className="text-slate-500 line-through">
            ₹{product.price.toLocaleString("en-in")}
          </span>
          <span className="text-green-700">
            {product.discountPercentage}% Off
          </span>
        </p>
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
  );
}

export default ProductDetails;
