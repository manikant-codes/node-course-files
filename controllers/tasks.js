const getAllTasks = (req, res) => {
  res.send("All To-Dos");
};

const getSingleTask = (req, res) => {
  res.send("To-Do with ID: " + req.params.id);
};

const addTask = (req, res) => {
  res.send("Added New Todo");
};

const updateTask = (req, res) => {
  res.send("Updated Todo with ID: " + req.params.id);
};

const deleteTask = (req, res) => {
  res.send("Deleted Todo with ID: " + req.params.id);
};

module.exports = {
  getAllTasks,
  getSingleTask,
  addTask,
  updateTask,
  deleteTask,
};
