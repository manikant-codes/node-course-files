const fs = require("fs");

// const data = fs.readFileSync("./files/users/users.txt", { encoding: "utf-8" });

// fs.readFile("./files/users/user.txt", { encoding: "utf-8" }, (error, data) => {
//   if (error) {
//     return console.log("Error: ", error.message);
//   }
//   console.log("data", data);
// });

// fs.writeFileSync("./files/users/info.txt", "In publishing and graphic design.");

// fs.writeFile(
//   "./files/users/info.txt",
//   "In publishing and graphic design.",
//   (error) => {
//     if (error) {
//       return console.log(error.message);
//     }
//     console.log(2);
//     console.log("Write completed!");
//   }
// );

// fs.appendFileSync("./files/users/info.txt", "\nHello World!");

// fs.appendFile("./files/users/info.txt", "\nHello World!", (error) => {
//   if (error) {
//     return console.log(error.message);
//   }
//   console.log(2);
//   console.log("Write completed!");
// });

// fs.unlinkSync("./files/users/info.txt");

// fs.unlink("./files/users/info.txt", (error) => {
//   if (error) {
//     return console.log(error.message);
//   }

//   console.log("Delete completed!");
// });

// fs.renameSync("./files/info.txt", "./files/info-new.txt");

// fs.rename("./files/info-new.txt", "./files/info.txt", (error) => {
//   if (error) {
//     return console.log(error.message);
//   }
//   console.log("Rename completed!");
// });

// fs.mkdirSync("./files/products");

// fs.mkdir("./files/products", (error) => {
//   if (error) {
//     return console.log(error.message);
//   }
//   console.log("Folder created!");
// });

// fs.rmdirSync("./files/products");

// fs.rmdir("./files/products", (error) => {
//   if (error) {
//     return console.log(error.message);
//   }
//   console.log("Folder deleted!");
// });

// const data = fs.readdirSync("./files");
// console.log(data);

// fs.readdir("./files", (error, data) => {
//   if (error) {
//     return console.log(error.message);
//   }
//   console.log(data);
// });
