const express = require("express");
const path = require("path");
const { users, posts } = require("./pages/data");

const server = express();

server.use(express.static("pages"));

// server.get("/", (req, res) => {
// res.status(200).send("<h1>Hello World!</h1>");
// res.status(200).json({ name: "Ram" });
// res.status(200).redirect("/about");
// res.download(path.join(__dirname, "pages", "mountains.jpg"));
//   res.status(200).sendFile(path.join(__dirname, "pages", "index.html"));
// });

// server.get("/index.css", (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "pages", "index.css"));
// });

// server.get("/mountains.jpg", (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "pages", "mountains.jpg"));
// });

server.get("/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});
