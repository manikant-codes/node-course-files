var http = require("http");
var fs = require("fs");

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ status: 404, message: "Error reading page!" })
        );
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/about") {
    const data = fs.readFileSync("./about.html");
    // for (let i = 0; i < 100000000; i++) {
    //   for (let j = 0; j < 100000000; j++) {}
    // }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404</h1>");
  }
});

server.listen(5050);

// let txt = "";

// for (let i = 0; i < 10; i++) {
//   txt += "Hello " + i + "\n";
// }

// fs.writeFile("./info.txt", txt, (err) => {
//   console.log(err);
// });
