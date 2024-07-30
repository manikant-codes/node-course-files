const express = require("express");
const path = require("path");

const server = express();

server.use(express.static("pages"));
server.set("view engine", "ejs");

server.get("/", (req, res) => {
  //   res.send("<h1>Hello world!</h1>");
  //   res.status(404).send("<h1>Hello world!</h1>");
  //   res.sendStatus(301);
  //   res.sendFile(path.join(__dirname, "pages", "index.html"));
  //   res.status(404).sendFile(path.join(__dirname, "pages", "index.html"));
  //   res.download(path.join(__dirname, "pages", "01.png"));
  //   res.json({ msg: "Hello" });
  //   res.status(404).json({ msg: "Not Found" });
  res.status(404).render("index", { name: "Manikant" });
});
server.get("/about", (req, res) => {
  res.render("about");
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});
