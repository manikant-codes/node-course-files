const fs = require("fs");

// readFile
// --------------------------------------------------
// const data = fs.readFileSync("./files/info.txt", { encoding: "utf-8" });
// console.log("data", data);

// fs.readFile("./files/info.txt", { encoding: "utf-8" }, (error, data) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }

//   console.log("data", data);
// });

// writeFile
// --------------------------------------------------
// fs.writeFileSync("./files/infoNew.txt", "Hello World!");

// fs.writeFile("./files/infoNew.txt", "Hello World!", (error) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }
//   console.log("Write sucessful!");
// });

// Taking a file's backup.
// --------------------------------------------------
// const data = fs.readFileSync("./files/info.txt", { encoding: "utf-8" });
// fs.writeFileSync("./files/infoBackup.txt", data);

// fs.readFile("./files/info.txt", { encoding: "utf-8" }, (error, data) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }

//   fs.writeFile("./files/infoBackup.txt", data, (error) => {
//     if (error) {
//       return console.log("Error: ", error);
//     }
//     console.log("Backup completed!");
//   });
// });

// appendFile
// --------------------------------------------------
// fs.appendFile("./files/info.txt", "\nNew Content!", (error) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }
//   console.log("Append completed!");
// });

// fs.appendFileSync("./files/info.txt", "\nNew Content!");

// mkdir
// --------------------------------------------------
// fs.mkdirSync("./files/backup");
// fs.mkdir("./files/backup", (error) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }
//   console.log("Folder created!");
// });

// unlink (To delete files.)
// --------------------------------------------------
// fs.unlinkSync("./files/infoBackup.txt");
// fs.unlink("./files/infoBackup.txt", (error) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }
//   console.log("File deleted!");
// });

// unlink (To delete folders.)
// --------------------------------------------------
// fs.rmdirSync("./files/backup");
// fs.rmdir("./files/backup", (error) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }
//   console.log("File deleted!");
// });
