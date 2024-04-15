const http = require("http");
const fs = require("fs");

const homePage = fs.readFileSync("./pages/index.html");
const aboutPage = fs.readFileSync("./pages/index.html");
const contactPage = fs.readFileSync("./pages/index.html");
const notFoundPage = fs.readFileSync("./pages/index.html");

const server = http.createServer((req, res) => {
  //   res.write("asd<h1>Hello World!</h1>");
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(homePage);
  } else if (req.url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(aboutPage);
  } else if (req.url === "/contact") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(contactPage);
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(notFoundPage);
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
