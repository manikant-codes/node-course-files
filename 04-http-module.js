// Server ek computer/machine hai jise network pe aaye hue requests ke badle response bhejne keliye progream kiya hota hai.

const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});
