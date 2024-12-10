const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found." });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found." });
    }

    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.desc) {
      product.desc = req.body.desc;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.discountPercentage) {
      product.discountPercentage = req.body.discountPercentage;
    }

    const updatedProduct = await product.save();

    // Or, but this approach doesn't check schema.
    // const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    //   new: true
    // });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found." });
    }

    res
      .status(200)
      .json({ success: true, msg: "Product deleted successfuly." });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
