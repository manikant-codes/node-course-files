const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //   res.send("Hello world!");
  //   res.send("<h1>Hello world!</h1>");
  //   res.sendStatus(200);
  //   res.status(200).send("<h1>Hello world!</h1>");
  //   res.sendFile(path.join(__dirname, "pages", "index.html"), () => {});
  //   res.download("files/file-1.txt");
  //   res.json({ msg: "Hello world!" });
  //   res.status(200).json({ msg: "Hello world!" });
  res.render("index", { text: "world" });
});

app.listen(5000, () => {
  console.log("The server is listening on port 5000!");
});
