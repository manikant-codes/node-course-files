const createOrder = async (req, res) => {
  try {
    console.log("req.body", req.body);
    res.status(200).json({ success: true, msg: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { createOrder };
