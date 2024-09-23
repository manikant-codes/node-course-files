import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ProductCard({ product }) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 240 }}
        image={product.images[0]}
        title={product.name}
      />
      <CardContent className="">
        <Typography gutterBottom variant="h5" component="p">
          {product.name}
        </Typography>

        <div className="flex items-center justify-between">
          <Typography gutterBottom variant="h6" component="p" className="!mb-0">
            ₹{product.price.toLocaleString("en-in")}
          </Typography>
          <Button variant="contained" size="small">
            View More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
