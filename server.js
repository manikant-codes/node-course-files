const express = require("express");
const path = require("path");
const tasksRouter = require("./routes/tasks");

const app = express();

app.use("/tasks", tasksRouter);

// app.get("/tasks", (req, res) => {
//   res.send("All To-Dos");
// });

// app.get("/tasks/:id", (req, res) => {
//   res.send("To-Do with ID: " + req.params.id);
// });

// app.post("/tasks", (req, res) => {
//   res.send("Added New Todo");
// });

// app.patch("/tasks/:id", (req, res) => {
//   res.send("Updated Todo with ID: " + req.params.id);
// });

// app.delete("/tasks/:id", (req, res) => {
//   res.send("Deleted Todo with ID: " + req.params.id);
// });

app.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
