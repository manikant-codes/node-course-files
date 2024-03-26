const Todo = require("../models/Todo");
const asyncWrapper = require("../utils/asyncWrapper");

// Ye controller mai router ko as an argument dunga. Iska function hoona jaruri hai. Is controller ko router req, res aur next dega.

// const getAllTodos = async (req, res) => {
//   try {
//     const result = await Todo.find({});
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

const getAllTodos = asyncWrapper(async (req, res) => {
  const result = await Todo.find({});
  res.status(200).json({ success: true, data: result });
});

// const getTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Todo.findById(id);
//     if (!result) {
//       return res
//         .status(404)
//         .json({ success: false, msg: "No such todo found!" });
//     }
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

const getTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Todo.findById(id);
  if (!result) {
    return res.status(404).json({ success: false, msg: "No such todo found!" });
  }
  res.status(200).json({ success: true, data: result });
});

// const addTodo = async (req, res) => {
//   try {
//     const result = await Todo.create(req.body);
//     res.status(201).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

const addTodo = asyncWrapper(async (req, res) => {
  const result = await Todo.create(req.body);
  res.status(201).json({ success: true, data: result });
});

// const updateTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Todo.findByIdAndUpdate(id, req.body, {
//       returnOriginal: false,
//     });

//     if (!result) {
//       return res
//         .status(404)
//         .json({ success: false, msg: "No such todo found!" });
//     }

//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

const updateTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Todo.findByIdAndUpdate(id, req.body, {
    returnOriginal: false,
  });

  if (!result) {
    return res.status(404).json({ success: false, msg: "No such todo found!" });
  }

  res.status(200).json({ success: true, data: result });
});

// const deleteTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Todo.findByIdAndDelete(id);
//     if (!result) {
//       return res
//         .status(404)
//         .json({ success: false, msg: "No such todo found!" });
//     }
//     res.status(200).json({ success: true, data: null });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

const deleteTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Todo.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).json({ success: false, msg: "No such todo found!" });
  }
  res.status(200).json({ success: true, data: null });
});

module.exports = {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
