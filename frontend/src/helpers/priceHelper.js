export function getDiscountedPrice(price, discount) {
  const discountValue = (price * discount) / 100;
  return price - discountValue;
}
