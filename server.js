const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
const connect = require("./db/connect");

app.use("/tasks", tasksRouter);

app.get("*", (req, res) => {
  res.send("Path doen't exist!");
});

async function start() {
  try {
    await connect();
    console.log("Database connected successfully!");
    app.listen(5000, () => {
      console.log("Server is listening on port 5000!");
    });
  } catch (error) {
    console.log("error");
    console.log("Failed to connect to the database!");
  }
}

start();
