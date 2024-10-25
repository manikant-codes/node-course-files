const express = require("express");
const server = express();
const path = require("path");

server.use(express.static("pages"));

// server.get("/", (req, res) => {
//   res.status(200);
//   res.send("<h1>Hello World</h1>");
//   OR
//   res.status(200).send("<h1>Hello World</h1>");
//   res.status(200).sendFile(path.join(__dirname, "pages", "index.html"));
//   res.status(200).json({ name: "Ram", roll: 10 });
//   res.status(200).download(path.join(__dirname, "info.txt"));
//   res.status(200).redirect("/about");
// });

// server.get("/css/index.css", (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "pages", "css", "index.css"));
// });

// server.get("/js/index.js", (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "pages", "js", "index.js"));
// });

// server.get("/about", (req, res) => {
//   res.status(200).send("<h1>About Page</h1>");
// });

server.get("/contact", (req, res) => {
  res.status(200).send("<h1>Contact Page</h1>");
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
