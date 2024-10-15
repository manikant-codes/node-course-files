// const fs = require("fs");
const fs = require("fs/promises");

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

// readdir (To list contents of a folder.)
// --------------------------------------------------
// const contents = fs.readdirSync("./notes");
// console.log("contents", contents);
// fs.readdir("./notes", {}, (error, contents) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }
//   console.log("contents", contents);
// });

// readdir (Promises) (To list contents of a folder.)
// --------------------------------------------------
// fs.readdir("./notes")
//   .then((data) => {
//     console.log("data", data);
//   })
//   .catch((error) => {
//     console.log("Error: ", error);
//   });

// async function readFolder() {
//   const contents = await fs.readdir("./notes");
//   console.log("contents", contents);
// }

// readFolder();
