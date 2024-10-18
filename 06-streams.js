// const fs = require("fs");

// const readStream = fs.createReadStream("./files/users/users.json", {
//   highWaterMark: 1024
// });

// const writeStream = fs.createWriteStream("./users.json", {
//   highWaterMark: 1024
// });

// readStream.setEncoding("utf-8");

// readStream.on("data", (chunk) => {
//   writeStream.write(chunk, (error) => {
//     if (error) {
//       console.log("Failed to write file!");
//     }
//   });
// });

// readStream.on("end", () => {
//   console.log("Finished reading file!");
// });

// readStream.pipe(writeStream);
