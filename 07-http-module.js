const http = require("http");
const fs = require("fs");

// const homePageContent = fs.readFileSync("./pages/index.html");

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const readStream = fs.createReadStream("./pages/index.html", {
      highWaterMark: 1024,
      encoding: "utf-8"
    });

    let data = "";

    readStream.on("data", function (chunk) {
      data += chunk;
    });

    readStream.on("end", function () {
      res.write(data);
      res.end();
    });
  } else if (req.url === "/css/index.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const readStream = fs.createReadStream("./pages/css/index.css", {
      highWaterMark: 1024,
      encoding: "utf-8"
    });

    let data = "";

    readStream.on("data", function (chunk) {
      data += chunk;
    });

    readStream.on("end", function () {
      res.write(data);
      res.end();
    });
  } else if (req.url === "/js/index.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    const readStream = fs.createReadStream("./pages/js/index.js", {
      highWaterMark: 1024,
      encoding: "utf-8"
    });

    let data = "";

    readStream.on("data", function (chunk) {
      data += chunk;
    });

    readStream.on("end", function () {
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



server.listen(5000);
