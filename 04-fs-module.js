const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "folderOne", "folderTwo", "info.csv");

console.log("Log 1");

// fs.writeFileSync(filePath, "Hello world 1!");

// fs.writeFile(filePath, "manikant,10,45,56,89", (err) => {
//   console.log("myerr", err);
//   console.log("Write complete!");
// });

// const data = fs.readFileSync(filePath);
// console.log("data", data.toString());

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.log("Error: ", err);
  }
  console.log("data", data.toString());
});

console.log("Log 2");
