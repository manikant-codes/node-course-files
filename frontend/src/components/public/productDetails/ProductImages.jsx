import React from "react";

function ProductImages({ images }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-8">
      {images.map((url, index) => {
        return (
          <div key={index} className="w-full h-[400px]">
            <img src={url} alt="" className="w-full h-full object-cover" />
          </div>
        );
      })}
    </div>
  );
}

export default ProductImages;
