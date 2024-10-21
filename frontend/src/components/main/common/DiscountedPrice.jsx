import { getDiscountedPrice } from "../../../helpers/priceHelper";

function DiscountedPrice({ product }) {
  if (product.discountPercentage) {
    return (
      <p className="flex gap-2 items-baseline">
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
    );
  }
  return <p className="text-2xl">₹{product.price.toLocaleString("en-in")}</p>;
}

export default DiscountedPrice;
