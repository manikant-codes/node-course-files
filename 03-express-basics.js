const express = require("express");
const path = require("path");
const server = express();

server.use(express.static("pages"));

// server.get("/", (req, res) => {
// res.status(200);
// res.send("<h1>Hello World!</h1>");
// OR;
// res.status(200).send("<h1>Hello World!</h1>");
// res.status(200);
// res.sendFile(path.join(__dirname, "pages", "index.html"));
// OR;
// res.status(200).sendFile(path.join(__dirname, "pages", "index.html"));
// res.status(200);
// res.json({ name: "Ram", roll: 10 });
// OR;
// res.status(200).json({ name: "Ram", roll: 10 });
// res.sendStatus(500);
// res.download("./info.txt");
// res.redirect("/about");
// });

server.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "about.html"));
});

server.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "contact.html"));
});

server.all("*", (req, res) => {
  res.send("<h1>Page Not Found</h1>");
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
