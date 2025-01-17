export function getMRP(price, taxPercentage) {
  if (!taxPercentage) {
    return price;
  }

  const tax = (taxPercentage * price) / 100;
  const mrp = price + tax;
  return mrp;
}

export function getDiscountedPrice(price, taxPercentage, discountPercentage) {
  if (!discountPercentage) {
    if (!taxPercentage) {
      return price;
    }
    const tax = (taxPercentage * price) / 100;
    const mrp = price + tax;
    return mrp;
  }

  const discount = (discountPercentage * price) / 100;
  const tax = (taxPercentage * price) / 100;
  const dicountedPrice = price - discount + tax;

  return dicountedPrice;
}
