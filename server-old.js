const http = require("http");
const fs = require("fs");

const homePage = fs.readFileSync("./public/index.html");
const homePageCss = fs.readFileSync("./public/css/index.css");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    try {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(homePage);
      res.end();
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ err: "Something went wrong!" }));
      res.end();
    }
  } else if (req.url === "/css/index.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(homePageCss);
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>About Page!</h1>");
    res.end();
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Contact Page!</h1>");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>Page Not Found!</h1>");
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Server is  listening on port 5000!");
});
