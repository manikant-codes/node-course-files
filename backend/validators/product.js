const Product = require("../models/Product");

const productValidator = async (id, body, res) => {
  if (
    !body.price ||
    !body.category ||
    !body.subCategory ||
    !body.desc ||
    !body.name ||
    !body.slug
  ) {
    return res.status(400).json({
      success: false,
      msg: "Price, category, sub-category, description, name and slug are required fields!",
    });
  }

  if (id) {
    const existingProductById = await Product.findById(id);
    const existingProductBySlug = await Product.findOne({ slug: body.slug });
    if (existingProductById.slug !== existingProductBySlug.slug) {
      return res.status(400).json({
        success: false,
        msg: "Product slug already exists!",
      });
    }
  } else {
    const existingProduct = await Product.findOne({ slug: body.slug });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        msg: "Product slug already exists!",
      });
    }
  }
};

module.exports = { productValidator };
