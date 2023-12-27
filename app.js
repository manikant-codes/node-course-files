var http = require("http");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "false", message: "Success!" }));
});

server.listen(5000);
