// const fs = require("fs");
// const buffer = new Buffer("Manikant asdd asd asd asd");

// fs.stat("./concepts/fs/info.txt", function (err, stats) {
//   if (err) {
//     console.log("err", err);
//   } else {
// console.log("stats", stats);
// console.log("stats", stats.isFile());
// console.log("stats", stats.isSocket());
//   }
// });

// fs.open("./concepts/fs/info.txt", "r+", function (err, fileDescriptor) {
//   if (err) {
//     console.log("err", err);
//   } else {
//     console.log("fileDescriptor", fileDescriptor);
// fs.write(fileDescriptor, buffer, function (err, data) {
//   if (err) {
//     console.log("err 1", err);
//   } else {
//     console.log("data", data);
//   }
// });

//     const buffer = new Buffer(2);

//     fs.read(
//       fileDescriptor,
//       buffer,
//       0,
//       buffer.byteLength,
//       0,
//       function (err, bytes, b) {
//         if (err) {
//           console.log("err", err);
//         } else {
//           console.log("data", bytes, b.toString());
//         }
//       }
//     );
//   }
// });
