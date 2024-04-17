const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const temp = url.parse(req.url, true);
  if (temp.pathname === "/default") {
    res.end(`Here is your ${temp.query.color}  ${temp.query.category}!`);
  } else {
    res.end(`Not found!`);
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
