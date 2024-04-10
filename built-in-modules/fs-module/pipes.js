const fs = require("fs");
const zlib = require("zlib");

const gzip = zlib.createGzip();

const readableStream = fs.createReadStream("./info.txt", {
  encoding: "utf-8",
  highWaterMark: 2,
});

readableStream.pipe(gzip).pipe(fs.WriteStream("./file2.txt.gz"));

const writeableStream = fs.createWriteStream("./info-backup.txt");

readableStream.pipe(writeableStream);

// Buffers that streams use has a default size of 64kb;
