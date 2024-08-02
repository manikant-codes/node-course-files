const getAllUsers = (req, res) => {
  res.status(200).json({ msg: "All users" });
};

const addUser = (req, res) => {
  res.status(200).json({ msg: "User added" });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ msg: `User ${id} updated` });
};

const deleteUser = (req, res) => {
  res.status(200).json({ msg: "User deleted" });
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
