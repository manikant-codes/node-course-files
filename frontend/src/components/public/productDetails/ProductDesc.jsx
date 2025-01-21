import React, { useState } from "react";
import MyMultiSelect from "../../admin/common/form/MyMultiSelect";
import { COLORS, SIZES } from "../../../consts";
import MySelect from "../../admin/common/form/MySelect";
import { Button, Label, Select } from "flowbite-react";
import { getDiscountedPrice, getMRP } from "../../../helpers/priceHelper";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

function ProductDesc({ product }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const dispatch = useDispatch();

  if (!product.sizes.includes("Select Size")) {
    product.sizes.unshift("Select Size");
  }
  if (!product.colors.includes("Select Color")) {
    product.colors.unshift("Select Color");
  }

  function handleSelect(e) {
    if (e.target.name === "size") {
      setSize(e.target.value);
    } else {
      setColor(e.target.value);
    }
  }

  function handleAddToCart() {
    dispatch(addToCart({ ...product, quantity: 1, size, color }));
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-500 mb-4">{product.desc}</p>

      <p className="border border-gray-300 inline-flex p-[6px] rounded-md gap-2">
        <span className="border-r border-r-gray-300 pr-2">4.3 ⭐</span>
        <span className="">7 Ratings</span>
      </p>

      <hr className="my-3" />

      <div className="mb-4">
        <p className="inline-flex gap-4 text-xl">
          <span>
            <b>
              ₹
              {getDiscountedPrice(
                product.price,
                product.taxPercentage,
                product.discountPercentage
              )}
            </b>
          </span>
          <span className="text-gray-500">
            MRP{" "}
            <span className="line-through">
              ₹{getMRP(product.price, product.taxPercentage)}
            </span>
          </span>
          <span className="text-green-500">
            <b>({product.discountPercentage}% OFF)</b>
          </span>
        </p>
        <p>Inclusive of all taxes.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <Label htmlFor="size" value="Size" />
          <Select id="size" name="size" value={size} onChange={handleSelect}>
            {product.sizes.map((size, index) => {
              return (
                <option key={index} value={size}>
                  {size}
                </option>
              );
            })}
          </Select>
        </div>
        <div>
          <Label htmlFor="color" value="Color" />
          <Select id="color" name="color" value={color} onChange={handleSelect}>
            {product.colors.map((color, index) => {
              return (
                <option key={index} value={color}>
                  {color}
                </option>
              );
            })}
          </Select>
        </div>
      </div>

      <Button onClick={handleAddToCart} disabled={!size || !color}>
        Add to Cart
      </Button>
    </div>
  );
}

export default ProductDesc;
