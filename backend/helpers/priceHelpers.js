const getProductPrice = (
  price,
  taxPercentage,
  discountPercentage,
  shippingFee
) => {
  if (discountPercentage) {
    const discount = (price * discountPercentage) / 100;
    price = price - discount;
  }

  if (taxPercentage) {
    const tax = (price * taxPercentage) / 100;
    price = price + tax;
  }

  if (shippingFee) {
    price = price + shippingFee;
  }

  return price;
};

module.exports = { getProductPrice };
