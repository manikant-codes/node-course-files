const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "folderOne", "folderTwo", "info.txt");

const filePathNew = path.join(
  __dirname,
  "folderOne",
  "folderTwo",
  "changed-file-name.txt"
);

console.log("Log 1");

// fs.writeFileSync(filePath, "Hello world 1!");

// fs.writeFile(filePath, "manikant,10,45,56,89", (err) => {
//   console.log("myerr", err);
//   console.log("Write complete!");
// });

// const data = fs.readFileSync(filePath);
// console.log("data", data.toString());

// fs.readFile(filePath, "utf8", (err, data) => {
//   if (err) {
//     return console.log("Error: ", err);
//   }
//   console.log("data", data);
// });

// console.log("Log 2");

// fs.unlink(filePath, (err) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("File deleted successfully!");
// });

fs.rename(filePath, filePathNew, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("File renamed successfully!");
});
