const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "files");

fs.readdir(folderPath, (err, files) => {
  if (err) {
    return console.log("Error: ", err);
  }

  const filePaths = files.map((fileName) => {
    return path.join(__dirname, "files", fileName);
  });

  const fileStats = filePaths.map((filePath) => {
    return { path: filePath, stats: fs.statSync(filePath) };
  });

  const fileStatsSorted = fileStats
    .sort(function (a, b) {
      return a.stats.ctimeMs - b.stats.ctimeMs;
    })
    .map((value) => {
      return value.path;
    });

  let counter = 1;

  for (const fileName of fileStatsSorted) {
    const pathObj = path.parse(fileName);
    console.log(pathObj);
    fs.rename(
      fileName,
      path.join(pathObj.dir, `file-${counter}.txt`),
      (err) => {
        if (err) {
          return console.log("Error: ", err);
        }
        console.log("Renamed");
      }
    );
    counter++;
  }

  console.log("fileStatsSorted", fileStatsSorted);
});
