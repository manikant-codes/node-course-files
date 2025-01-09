import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProductListItem({ slug, image, name, desc, price }) {
  const navigate = useNavigate();

  function handleGoToDetailsPage(productSlug) {
    navigate(productSlug);
  }

  return (
    <li
      onClick={() => {
        handleGoToDetailsPage(slug);
      }}
      className="border border-gray-300 p-4"
    >
      <img
        src={image}
        alt=""
        className="w-full h-[256px] object-cover object-top mb-2"
      />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-500 line-clamp-2 mb-2">{desc}</p>
      <p className="text-lg font-semibold flex items-center justify-between">
        <span>₹{price.toLocaleString("en-in")}</span>
        <Button size="xs">
          <span>Buy Now</span>
        </Button>
      </p>
    </li>
  );
}

export default ProductListItem;
