const path = require("path");
const express = require("express");
const { navbar } = require("./public/components");
const server = express();

server.use("/public", express.static("public"));

server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.render("index", { navbar });
});
server.get("/about", (req, res) => {
  res.render("about", { navbar });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
