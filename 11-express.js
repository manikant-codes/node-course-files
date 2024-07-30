const path = require("path");
const express = require("express");
const server = express();

server.set("view engine", "ejs");

server.get("/", (req, res) => {
  //   res.sendStatus(500);
  //   res.send("Hello world!");
  //   res.status(404).send("Hello world!");
  //   res.sendFile(path.join(__dirname, "pages", "index.html"));
  //   res.status(404).sendFile(path.join(__dirname, "pages", "index.html"));
  //   res.download(path.join(__dirname, "data", "users.json"));
  //   res.json({ msg: "Hello world!" });
  //   res.status(404).json({ msg: "Not found!" });
  //   res.render("index", { name: "John Doe" });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
