export function getDiscountedPrice(price, discount) {
  const discountValue = (price * discount) / 100;
  return price - discountValue;
}

export function getTax(price, tax) {
  const taxValue = (price * tax) / 100;
  return taxValue;
}
