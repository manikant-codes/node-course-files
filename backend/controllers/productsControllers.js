const getAllProducts = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
