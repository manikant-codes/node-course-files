const fs = require("fs");
const path = require("path");

const filePathCopy = path.join(__dirname, "files", "users.csv");
const filePathPaste = path.join(__dirname, "files", "users-new.csv");

// fs.readFile(filePathCopy, "utf-8", (err, data) => {
//   if (err) {
//     return console.log("Error: ", err);
//   }

//   fs.writeFile(filePathPaste, data, (err) => {
//     if (err) {
//       return console.log("Error: ", err);
//     }
//     console.log("Write Completed");
//   });
// });
