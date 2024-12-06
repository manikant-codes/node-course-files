// Server ek computer/machine hai jise network pe aaye hue requests ke badle response bhejne keliye progream kiya hota hai.

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // try {
    // res.writeHead(200, { "Content-Type": "text/html" });
    // const html = fs.readFileSync("./pages/index.html", {encoding: "utf8"});
    // res.end(html);
    // } catch (error) {
    // res.writeHead(500, { "Content-Type": "text/html" });
    // res.end("<h1>Something went wrong!</h1>");
    // }

    fs.readFile("./pages/index.html", { encoding: "utf8" }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Something went wrong!</h1>");
      } else {
        // res.writeHead(200, { "Content-Type": "text/html" });
        // res.end(data);
        // res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ name: "Ram" }));
      }
    });
  } else if (req.url === "/index.css") {
    fs.readFile("./pages/index.css", { encoding: "utf8" }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Something went wrong!</h1>");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  } else if (req.url === "/mountains.jpg") {
    fs.readFile("./pages/mountains.jpg", (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      }
    });
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Page</h1>");
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Contact Page</h1>");
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(5500, () => {
  console.log("Server is listening on port 5000.");
});
