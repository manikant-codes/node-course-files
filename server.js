const express = require("express");
const tasksRouter = require("./routes/tasks");
const adminRouter = require("./routes/admin");

const app = express();

app.use("/admin", adminRouter);

// app.use("/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

// app.use(logger);

app.get("/contact", logger, (req, res) => {
  res.send("Contact Page");
});

app.get("*", (req, res) => {
  res.send("404 Page");
});

function logger(req, res, next) {
  console.log(req.url);
  next();
}

app.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
