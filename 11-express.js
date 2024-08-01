const express = require("express");
const path = require("path");
const { navbar } = require("./12-components");

const data = ["apple", "orange", "banana", "kiwi"];

const server = express();

server.use(express.static("public"));

server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.render("index", { navbar, data });
});

server.get("/about", (req, res) => {
  res.render("about", { navbar });
});

server.get("/contact", (req, res) => {
  res.render("contact", { navbar });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});
