const getDashboard = (req, res) => {
  res.send(`<h1>Admin Dashboard</h1><p>Welcome, ${req.username}</p>`);
};

const getOrders = (req, res) => {
  res.send("Orders Page");
};

const getPayments = (req, res) => {
  res.send("Payments Page");
};

module.exports = {
  getDashboard,
  getOrders,
  getPayments,
};
