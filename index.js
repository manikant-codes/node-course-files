const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  //   res.sendStatus(400);
  //   res.send("Hello World!");
  //   res.status(200).send("Hello World!");
  //   res.status(200).json({ msg: "Hello World!" });
  //   res.json({ msg: "Hello World!" });
  //   res.download("info.txt");
  res.render("index", { msg: "Hello Express" });
});

app.listen(5000, () => {
  console.log("The server is listening on port 5000!");
});

// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const server = express();

// // app.use(express.static("./pages"));

// server.get("/", (req, res, next) => {
//   // res.sendStatus(404);
//   // res.send("Hello World!");
//   // res.json({ msg: "Hello World!" });
//   // res.sendFile(path.join(__dirname, "/pages/index.html"));
//   // res.status(404).send("Not Found!");
//   // res.status(404).json("Not Found!");
//   res.status(200).sendFile(path.join(__dirname, "/pages/index.html"));
// });

// // app.get("/index.css", (req, res, next) => {
// //   res.status(200).sendFile(path.join(__dirname, "/pages/index.css"));
// // });

// server.listen(5000, () => {
//   console.log("Server is listening on port 5000!");
// });
