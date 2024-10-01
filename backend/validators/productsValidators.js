const Product = require("../models/Product");
const MyError = require("../utils/errorUtils");

const productValidator = async (body, id) => {
  if (!body.price) {
    throw new MyError("Price is required!", 400);
  }

  if (!body.subCategory) {
    throw new MyError("Sub-category is required!", 400);
  }

  if (!body.desc) {
    throw new MyError("Description is required!", 400);
  }

  if (body.desc?.trim().length < 20) {
    throw new MyError("Description must be atleat 20 characters!", 400);
  }

  if (!body.name) {
    throw new MyError("Name is required!", 400);
  }

  if (!body.slug) {
    throw new MyError("Slug is required!", 400);
  }

  if (id) {
    const existingProductById = await Product.findById(id);
    const existingProductBySlug = await Product.findOne({ slug: body.slug });

    if (
      existingProductById &&
      existingProductBySlug &&
      existingProductById.slug !== existingProductBySlug.slug
    ) {
      throw new MyError("Product slug already exists!", 400);
    }
  } else {
    const existingProduct = await Product.findOne({ slug: body.slug });
    if (existingProduct) {
      throw new MyError("Product slug already exists!", 400);
    }
  }
};

module.exports = { productValidator };
