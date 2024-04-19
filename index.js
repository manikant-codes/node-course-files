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
