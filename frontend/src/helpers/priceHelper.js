export function getDiscountedPrice(price, discount) {
  console.log(price, discount);
  const discountValue = (price * discount) / 100;
  return price - discountValue;
}
