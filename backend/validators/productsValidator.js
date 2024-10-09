const { MyError } = require("../helpers/errorHelper");

const minLengthOneValidator = (value) => {
  if (!value) {
    return false;
  }

  if (value && !Array.isArray(value)) {
    return false;
  }

  if (value && Array.isArray(value) && !value.length) {
    return false;
  }

  return true;
};

const productValidator = (files, body) => {
  if (!files && !body.images) {
    throw new MyError("Images are required!", 404);
  }

  if (!body.name) {
    throw new MyError("Name required!", 404);
  }

  if (!body.slug) {
    throw new MyError("Slug required!", 404);
  }

  if (!body.desc) {
    throw new MyError("Description is required!", 404);
  }

  if (body.desc && body.desc.length < 10) {
    throw new MyError("Description cannot be less than 10 characters!", 404);
  }

  if (!body.category) {
    throw new MyError("Category is required!", 404);
  }

  if (!body.subCategory) {
    throw new MyError("Sub-category is required!", 404);
  }

  if (body.quantity < 0) {
    throw new MyError("Quantity cannot be less than 0!", 404);
  }

  if (body.price < 0) {
    throw new MyError("Price cannot be less than 0!", 404);
  }

  if (body.deliveryCharges < 0) {
    throw new MyError("Delivery charges cannot be less than 0!", 404);
  }

  if (body.discountPercentage < 0) {
    throw new MyError(
      "Discount percentage charges cannot be less than 0!",
      404
    );
  }

  if (body.taxPercentage < 0) {
    throw new MyError("Tax percentage charges cannot be less than 0!", 404);
  }
};

module.exports = { minLengthOneValidator, productValidator };
