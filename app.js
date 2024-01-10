// var http = require("http");
// var fs = require("fs");
// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

// const server = http.createServer(function (req, res) {
//   if (req.url === "/") {
//     console.log("process", process.env.SECRET);
//     fs.readFile("./index.html", (err, data) => {
//       if (err) {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         return res.end(
//           JSON.stringify({ status: 404, message: "Error reading page!" })
//         );
//       }
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     });
//   } else if (req.url === "/about") {
//     const data = fs.readFileSync("./about.html");
//     // for (let i = 0; i < 100000000; i++) {
//     //   for (let j = 0; j < 100000000; j++) {}
//     // }
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(data);
//   } else {
//     res.writeHead(404, { "Content-Type": "text/html" });
//     res.end("<h1>404</h1>");
//   }
// });

// server.listen(5050);

// let temp;

// async function getData() {
//   try {
//     const data1 = await fs.readFile("./info.txt", { encoding: "utf-8" });
//     const data2 = await fs.readFile("./info2.txt", { encoding: "utf-8" });
//     const data3 = await fs.readFile("./info3.txt", { encoding: "utf-8" });

//     return data1 + data2 + data3;
//   } catch (err) {
//     console.log(err);
//   }
// }

// getData()
//   .then((data) => {
//     temp = data;
//     console.log("temp", temp);
//   })
//   .catch((err) => console.log(err));

// module.exports = { temp };

// (function(__dirname, __filename, exports) {})()

// function a() {
//   console.log("A!");
// }

// function b() {
//   console.log("B!");
// }

// function c() {
//   console.log("C!");
// }

// a();

// fs.open("./info.txt", "r", (err, fd) => {
//   console.log("err", err);
//   console.log("Second!", fd);
//   console.log("fd", fd);
// });

// a();

// setTimeout(function myTimeout() {
//   console.log("Inside Timeout!");
// }, 5000);

// b();
