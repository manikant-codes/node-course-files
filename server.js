const express = require("express");
const tasksRouter = require("./routes/tasks");

const app = express();

app.use("/tasks", tasksRouter);

app.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
