// const fs = require("fs");
const fs = require("fs/promises");

// console.log(1);

// const data = fs.readFileSync("./info.txt", "utf-8");
// console.log("data", data);

// fs.readFile("./info.txt", "utf-8", (error, data) => {
//   if (error) {
//     console.log("Error: ", error);
//   } else {
//     console.log("data", data);
//   }
// });

// console.log(2);

// fs.writeFileSync("./info-backup.txt", "Important data!", { flag: "a" });

// fs.writeFile(
//   "./info-backup.txt",
//   " Another important info!",
//   { flag: "a" },
//   (error) => {
//     if (error) {
//       console.log("Error: ", error);
//     }
//   }
// );

// fs.readFile("./info.txt", "utf-8", (err, data) => {
//   if (err) {
//     return console.log("Error while reading from file!");
//   }
//   fs.writeFile("./info-backup.pdf", data, (err) => {
//     if (err) {
//       console.log("Error whilte writing to the file!");
//     }
//   });
// });

// fs.readFile("./info.txt", "utf-8")
//   .then((data) => {
//     fs.writeFile("./info-backup.txt", data)
//       .then(() => {
//         console.log("Back up completed!");
//       })
//       .catch((err) => {
//         console.log("Error whilte writing to the file!");
//       });
//   })
//   .catch((err) => {
//     console.log("Error while reading from file!");
//   });

// async function backup() {
//   try {
//     const data = await fs.readFile("./info.txt", "utf-8");
//     await fs.writeFile("./info-backup.txt", data);
//     // await fs.unlink("./info.txt");
//   } catch (error) {
//     console.log("Error!");
//   }
// }

// backup();
