const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    // const data = fs.readFileSync(path.join(__dirname, "pages", "index.html"));
    const readStream = fs.createReadStream(
      path.join(__dirname, "pages", "index.html"),
      { highWaterMark: 1024 }
    );

    res.writeHead(200, { "Content-Type": "text/html" });

    readStream.on("data", (chunk) => {
      res.write(chunk);
    });
    readStream.on("close", () => {
      res.end();
    });
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>About</h1>");
    res.end();
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Contact</h1>");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>Not Found</h1>");
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
