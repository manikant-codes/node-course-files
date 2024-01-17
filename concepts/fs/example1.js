const fs = require("fs");
// const buffer = new Buffer.alloc(1024);

// console.log("buffer", buffer);

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

// fd: file-descriptor
// fs.open("./concepts/fs/info.txt", "r+", function (err, fd) {
//   if (err) {
//     console.log("err", err);
//   } else {
//     // console.log("fileDescriptor", process.stdin.fd);
//     // console.log("fileDescriptor", process.stdout.fd);
//     // console.log("fileDescriptor", process.stderr.fd);
//     // console.log("fileDescriptor", fd);

//     fs.ftruncate(fd, 9, function (err) {
//       fs.read(fd, buffer, 0, buffer.byteLength, 0, function (err, bytes) {
//         if (err) {
//           console.log("err", err);
//         } else {
//           console.log(bytes + " bytes read");
//           console.log(buffer.slice(0, bytes).toString());
//         }
//       });

//       fs.close(fd, function () {
//         console.log("File closed!");
//       });
//     });
//   }
// });

// fs.write(fd, buffer, function (err, data) {
//   if (err) {
//     console.log("err 1", err);
//   } else {
//     console.log("data", data);
//   }
// });

// const buffer = new Buffer(2);

// fs.writeFile("./concepts/fs/info.txt", "Hello World", function () {});

fs.unlink("./concepts/fs/info.txt", function (err) {
  if (err) {
  } else {
    console.log("File deleted successfully.");
  }
});
