const getAllProducts = (req, res) => {
  res.send("Get All Products");
};

const getSingleProduct = (req, res) => {
  res.send("Get Single Product");
};
const addProduct = (req, res) => {
  res.send("Add Product");
};
const updateProduct = (req, res) => {
  res.send("Update Product");
};
const deleteProduct = (req, res) => {
  res.send("Delete Product");
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
