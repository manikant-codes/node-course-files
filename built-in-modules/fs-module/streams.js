const fs = require("fs");

const readableStream = fs.createReadStream("./info.txt", {
  encoding: "utf-8",
  highWaterMark: 2,
});

const writeableStream = fs.createWriteStream("./info-backup.txt");

readableStream.on("data", (chunk) => {
  console.log("chunk", chunk);
  writeableStream.write(chunk);
});

// Buffers that streams use has a default size of 64kb;
