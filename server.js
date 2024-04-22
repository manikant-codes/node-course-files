const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// app.use(express.static("./pages"));

app.get("/", (req, res, next) => {
  // res.sendStatus(404);
  // res.send("Hello World!");
  // res.json({ msg: "Hello World!" });
  // res.sendFile(path.join(__dirname, "/pages/index.html"));
  // res.status(404).send("Not Found!");
  // res.status(404).json("Not Found!");
  res.status(200).sendFile(path.join(__dirname, "/pages/index.html"));
});

// app.get("/index.css", (req, res, next) => {
//   res.status(200).sendFile(path.join(__dirname, "/pages/index.css"));
// });

app.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
