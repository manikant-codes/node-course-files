const http = require("http");
const url = require("url");

const server = http.createServer(function (req, res) {
  console.log(
    url.parse(
      "http://localhost:5000/about?category=men&price=500&color=red",
      true
    )
  );
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
