const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

// const server = http.createServer(function (req, res) {
//   if (req.url === "/") {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     const data = fs.readFileSync(path.join(__dirname, "pages", "index.html"));
//     res.write(data);
//     res.end();
//   } else if (req.url === "/about") {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     res.write("<h1>About Page</h1>");
//     res.end();
//   } else if (req.url.startsWith("/product")) {
//     const parsed = url.parse(req.url, true);
//     console.log("parsed", parsed);
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     res.write("<h1>Product Page</h1>");
//     res.end();
//   } else if (req.url === "/contact") {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     res.write("<h1>Contact Page</h1>");
//     res.end();
//   } else {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     res.write("<h1>Page Not Found</h1>");
//     res.end();
//   }
// });

const server = http.createServer(function (req, res) {
  if (req.url === "/users") {
    fs.readFile(path.join(__dirname, "data", "users.json"), (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.write(
          JSON.stringify({ success: false, msg: "Something went wrong!" })
        );
        res.end();
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.write(data);
        res.end();
      }
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify({ success: false, msg: "Not found!" }));
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
