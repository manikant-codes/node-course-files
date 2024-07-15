const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "files", "renamed.txt");
const filePathNew = path.join(__dirname, "files", "info.txt");

// Write File
fs.writeFile(filePath, "good evening", (err) => {
  if (err) {
    return console.log("Error: ", err);
  }
  console.log("Write completed!");
});

// fs.writeFileSync(filePath, "hello world");

// Read File
// fs.readFile(filePath, (err, data) => {
//   if (err) {
//     return console.log("Error: ", err);
//   }
//   console.log("data", data.toString());
// });

// const data = fs.readFileSync(filePath);
// console.log("data", data.toString());

// Delete File
// fs.unlink(filePath, (err) => {
//   if (err) {
//     return console.log("Error: ", err);
//   }
//   console.log("File deleted!");
// });

// fs.unlinkSync(filePath);

// fs.rename(filePath, filePathNew, (err) => {
//   if (err) {
//     return console.log("Error: ", error);
//   }
//   console.log("File renamed!");
// });
// fs.renameSync(filePath, filePathNew);
