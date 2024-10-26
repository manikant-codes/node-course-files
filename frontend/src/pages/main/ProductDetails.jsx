import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import MessageBox from "../../components/common/MessageBox";
import ColorSelect from "../../components/main/common/ColorSelect";
import DiscountedPrice from "../../components/main/common/DiscountedPrice";
import Rating from "../../components/main/common/Rating";
import SizeSelect from "../../components/main/common/SizeSelect";
import TrendingProducts from "../../components/main/page/TrendingProducts";
import ImageViewer from "../../components/main/productDetails/ImageViewer";
import useFetch from "../../hooks/useFetch";
import { addToCart } from "../../redux/slices/cartSlice";
import { getProductBySlug } from "../../services/apiServices";

function ProductDetails() {
  const { productSlug } = useParams();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  const {
    loading,
    data: product,
    error
  } = useFetch(() => {
    return getProductBySlug(productSlug);
  }, [productSlug]);

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <MessageBox />;
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        {/* Product Images */}
        <ImageViewer images={product.images} />
        {/* Product Description */}
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
