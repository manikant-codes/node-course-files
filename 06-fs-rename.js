const path = require("path");
const fs = require("fs");

// const filePath = path.join(__dirname, "cake-shop.js");

// fs.stat(filePath, (err, stats) => {
//   if (err) {
//     return console.log("Error: ", err);
//   }

//   console.log("Stats: ", stats);
// });

fs.readdir(__dirname, (err, files) => {
  if (err) {
    return console.log("Error: ", err);
  }
  const filesToRename = files.filter((name) => {
    if (
      name.startsWith(".") ||
      name === "folderOne" ||
      name === "package.json" ||
      name === "fs-rename.js"
    ) {
      return false;
    }
    return true;
  });

  const filesCTime = [];

  for (const value of filesToRename) {
    const filePath = path.join(__dirname, value);
    const stats = fs.statSync(filePath);
    filesCTime.push({ time: stats.ctimeMs, filePath });
  }

  filesCTime.sort((a, b) => {
    return a.time - b.time;
  });

  let counter = 1;

  for (const value of filesCTime) {
    const objPath = path.parse(value.filePath);
    fs.rename(
      value.filePath,
      path.join(objPath.dir, `${counter}-${objPath.base}`),
      (err) => {
        if (err) {
          return console.log("Error: ", err);
        }
        console.log("File renamed!");
      }
    );
    counter++;
  }
});
