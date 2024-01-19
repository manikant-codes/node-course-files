const fs = require("fs");
// let data = "";
const readStream = fs.createReadStream("./concepts/fs/info.txt", {
  highWaterMark: 1024,
});

const writeStream = fs.createWriteStream("./concepts/fs/info2.txt", {
  highWaterMark: 1024,
});

readStream.pipe(writeStream);

// readStream.setEncoding("utf8");

// readStream.on("data", function (chunk) {
//   console.log("----------------------------------------------");
//   console.log(chunk);
//   data += chunk;
// });

// readStream.on("end", function () {
//   writeStream.write(data, function (chunk) {
//     if (!chunk) {
//       console.log("Data witten completely!");
//     }
//   });
// });
