const fs = require("fs");
const path = require("path");

const pathCopy = path.join(__dirname, "files", "file-1.txt");
const pathPaste = path.join(__dirname, "files", "file-2.txt");

// fs.readFile(pathCopy, (err, data) => {
//   if (err) {
//     return console.log("Error: ", err);
//   }

//   fs.writeFile(pathPaste, data.toString(), (err) => {
//     if (err) {
//       return console.log("Error: ", err);
//     }
//     console.log("Write Completed!");
//   });
// });

const readStream = fs.createReadStream(pathCopy, { highWaterMark: 1024 });
const writeStream = fs.createWriteStream(pathPaste);

// readStream.on("data", (chunk) => {
//   writeStream.write(chunk, (err) => {
//     if (err) {
//       return console.log("Error: ", err);
//     }
//   });
// });

readStream.pipe(writeStream);
