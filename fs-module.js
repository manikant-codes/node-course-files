const fs = require("fs/promises");

// const data = fs.readFileSync("./info.txt", { encoding: "utf-8" });

// console.log("Start");

// let temp;

// fs.readFile("./info.txt", { encoding: "utf-8" }, (err1, data1) => {
//   if (err1) {
//     console.log(err1);
//   } else {
//     fs.readFile("./info2.txt", { encoding: "utf-8" }, (err2, data2) => {
//       if (err2) {
//         console.log(err2);
//       } else {
//         fs.readFile("./info3.txt", { encoding: "utf-8" }, (err3, data3) => {
//           if (err3) {
//             console.log(err3);
//           } else {
//             console.log(data1 + data2 + data3);
//           }
//         });
//       }
//     });
//   }
// });

// fs.writeFileSync("./info2.txt", "Happy New Year!\n", { flag: "a" });

// fs.writeFile("./info3.txt", "Happy New Year!", { flag: "a" }, (err) => {
//   if (err) {
//     console.log("err", err);
//   }
// });

// console.log("End", temp);

// function getData() {
//   fs.readFile("./info.txt", { encoding: "utf-8" })
//     .then((data1) => {
//       fs.readFile("./info2.txt", { encoding: "utf-8" })
//         .then((data2) => {
//           fs.readFile("./info3.txt", { encoding: "utf-8" })
//             .then((data3) => console.log(data1 + data2 + data3))
//             .catch((err) => console.log(err));
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
