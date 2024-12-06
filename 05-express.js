const express = require("express");
const path = require("path");

const server = express();

server.use(express.static("pages"));

// server.get("/", (req, res) => {
//   //   res.status(404);
//   //   res.send("<h1>Hello World!</h1>");
//   //   OR
//   //   res.status(404).send("<h1>Not Found!</h1>");
//   //   res.status(404);
//   //   res.json({ name: "Ram" });
//   //   OR
//   //   res.status(404).json({ name: "Ram" });
//   const filePath = path.join(__dirname, "pages", "index.html");
//   //   res.status(404);
//   //   res.sendFile(filePath);
//   //   OR
//   res.status(200).sendFile(filePath);
//   //   const filePath = path.join(__dirname, "files", "info.txt");
//   //   res.status(200).download(filePath);
//   //   res.redirect("/about");
// });

// server.get("/index.css", (req, res) => {
//   const filePath = path.join(__dirname, "pages", "index.css");
//   res.status(200).sendFile(filePath);
// });

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
