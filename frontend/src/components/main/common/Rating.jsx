import React from "react";
import StarIcon from "@mui/icons-material/Star";

function Rating({ product }) {
  return (
    <>
      {!!product.rating && (
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <StarIcon className="!h-5 !w-5" /> {product.rating}
          </div>
          <div className="">|</div>
          <div className="index-ratingsCount">15.9k Ratings</div>
        </div>
      )}
    </>
  );
}

export default Rating;
