const http = require("http");
const fs = require("fs");
const { navbar, getFooter } = require("./components");

const homePage = fs
  .readFileSync("./pages/index.html", "utf-8")
  .replace("{{navbar}}", navbar)
  .replace("{{footer}}", getFooter("Company New"));

const aboutPage = fs
  .readFileSync("./pages/about.html", "utf-8")
  .replace("{{navbar}}", navbar)
  .replace("{{footer}}", getFooter("Company A"));

const contactPage = fs
  .readFileSync("./pages/contact.html", "utf-8")
  .replace("{{navbar}}", navbar)
  .replace("{{footer}}", getFooter("Company New New"));

const notFoundPage = fs
  .readFileSync("./pages/notFound.html", "utf-8")
  .replace("{{navbar}}", navbar)
  .replace("{{footer}}", getFooter("Company Old"));

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(homePage);
  } else if (req.url === "/index.css") {
    res.writeHead(200, { "content-type": "text/css" });
    fs.ReadStream("./pages/index.css").pipe(res);
  } else if (req.url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(aboutPage);
  } else if (req.url === "/contact") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(contactPage);
    // fs.ReadStream("./pages/contact.html").pipe(res);
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(notFoundPage);
    // fs.ReadStream("./pages/notFound.html").pipe(res);
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
