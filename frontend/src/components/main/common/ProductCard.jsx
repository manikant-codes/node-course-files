import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import DiscountedPrice from "./DiscountedPrice";

function ProductCard({ product }) {
  const navigate = useNavigate();

  function goToDetailsPage() {
    navigate(
      `/category/${product.category.slug}/${product.subCategory.slug}/${product.slug}`
    );
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 345 }} onClick={goToDetailsPage}>
      <CardMedia
        sx={{ height: 240 }}
        image={product.images[0]}
        title={product.name}
      />
      <CardContent className="">
        <Typography gutterBottom variant="h5" component="p">
          {product.name}
        </Typography>
        <DiscountedPrice product={product} />
      </CardContent>
    </Card>
  );
}

export default ProductCard;
