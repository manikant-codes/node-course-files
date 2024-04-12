const fs = require("fs");
const zlib = require("zlib");

const gzip = zlib.createGzip();

const readableStream = fs.createReadStream("./info.txt", {
  encoding: "utf-8",
  highWaterMark: 2,
});

const writeableStream = fs.createWriteStream("./backup.txt");

readableStream.pipe(gzip).pipe(fs.WriteStream("./file2.txt.gz"));

readableStream.pipe(writeableStream).pipe();

// readableStream.on("data", (chunk) => {
//   writeableStream.write(chunk);
// });
