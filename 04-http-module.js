// Server ek computer/machine hai jise network pe aaye hue requests ke badle response bhejne keliye progream kiya hota hai.

const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // const html = fs.readFileSync("./pages/index.html", { encoding: "utf8" });
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.end(html);
    // OR
    fs.readFile("./pages/index.html", { encoding: "utf8" }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Something went wrong!");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
        // OR
        // res.write("<h1>Hello World</h1>");
        // res.end();
      }
    });
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Page</h1>");
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Contact Page</h1>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});
