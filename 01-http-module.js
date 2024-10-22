const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    fs.readFile("./pages/index.html", { encoding: "utf-8" }, (error, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      // res.write(data);
      // res.end()
      // OR
      res.end(data);
    });
  } else if (req.url === "/css/index.css") {
    fs.readFile(
      "./pages/css/index.css",
      { encoding: "utf-8" },
      (error, data) => {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(data);
        res.end();
      }
    );
  } else if (req.url === "/js/index.js") {
    fs.readFile("./pages/js/index.js", { encoding: "utf-8" }, (error, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>About Page</h1>");
    res.end();
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Contact Page</h1>");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
