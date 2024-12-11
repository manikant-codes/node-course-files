const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => {
    if (product.id === Number(id)) {
      return true;
    }
    return false;
  });

  if (!foundProduct) {
    return res.status(404).json({ msg: "No such product found." });
  }

  res.status(200).json(foundProduct);
};

const addProduct = (req, res) => {
  res.status(200).json({ msg: "Add Product" });
};

const updateProduct = (req, res) => {
  res.status(200).json({ msg: "Update Product" });
};

const deleteProduct = (req, res) => {
  res.status(200).json({ msg: "Delete Product" });
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
