const express = require("express");
const path = require("path");
const server = express();

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

server.get("/css/index.css", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "css", "index.css"));
});

server.get("/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "js", "index.js"));
});

server.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

server.get("/contact", (req, res) => {
  res.send("<h1>Contact Page</h1>");
});

server.all("*", (req, res) => {
  res.send("<h1>Page Not Found</h1>");
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
