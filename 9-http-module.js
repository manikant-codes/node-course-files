const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(
      path.join(__dirname, "pages", "index.html"),
      "utf-8",
      (err, data) => {
        if (err) {
          console.log("Error: ", err);
          res.writeHead(500, {
            "Content-Type": "text/html",
          });
          res.end("Something went wrong!");
        } else {
          res.writeHead(200, {
            "Content-Type": "text/html",
          });
          res.end(data);
        }
      }
    );
  } else if (req.url === "/index.css") {
    fs.readFile(
      path.join(__dirname, "pages", "index.css"),
      "utf-8",
      (err, data) => {
        if (err) {
          res.writeHead(500, {
            "Context-Type": "text/plain",
          });
          res.end("Something went wrong!");
        } else {
          res.writeHead(200, {
            "Context-Type": "text/css",
          });
          res.end(data);
        }
      }
    );
  } else if (req.url === "/lotus.avif") {
    fs.readFile(path.join(__dirname, "pages", "lotus.avif"), (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Context-Type": "text/plain",
        });
        res.end("Something went wrong!");
      } else {
        res.writeHead(200, {
          "Context-Type": "image/avif",
        });
        res.end(data);
      }
    });
  } else if (req.url === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end("<h1>About Page</h1>");
  } else if (req.url === "/contact") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Contact Page</h1>");
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
