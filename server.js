const express = require("express");
const http = require("http");
const url = require("url");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //   res.sendStatus(404);
  //   res.send("Hello World!");
  //   res.status(404).json({ msg: "Resource not found!" });
  //   res.download("flower.jpg");
  res.render("index", { msg: "Hello Express" });
});

app.listen(5000, () => {
  console.log("The server is listening on port 5000!");
});
