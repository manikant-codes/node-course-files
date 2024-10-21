import { Paper } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  function goToListPage() {
    navigate(`${product.slug}`);
  }

  return (
    <div>
      <Paper
        onClick={goToListPage}
        variant="outlined"
        className="!rounded-lg overflow-hidden cursor-pointer"
      >
        <div className="h-[250px] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-2">
          <h3>{product.name}</h3>
        </div>
      </Paper>
    </div>
  );
}

export default ProductCard;
