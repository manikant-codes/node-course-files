const products = require("../data");

const getAllProducts = (req, res) => {
  try {
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getSingleProduct = (req, res) => {
  try {
    const { id } = req.params;

    const product = products.find((product) => {
      return product.id === Number(id);
    });

    if (product) {
      return res.status(200).json({ success: true, product });
    }

    res.status(404).json({ success: false, msg: "Product not found!" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { getAllProducts, getSingleProduct };
