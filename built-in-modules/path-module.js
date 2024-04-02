const path = require("path");

console.log("__filename", __filename);
console.log("__dirname", __dirname);

// console.log(path.basename(__filename));
// console.log(path.basename(__dirname));

// console.log("__filename", path.extname(__filename));
// console.log("__dirname", path.extname(__dirname));

// console.log(path.parse(__filename));
// console.log(path.format(path.parse(__filename)));

console.log(path.isAbsolute(__filename));
console.log(path.isAbsolute("./data.json"));

// console.log(path.join("folder1", "folder2", "index.html"));
// console.log(path.join("/folder1", "folder2", "index.html"));
// console.log(path.join("/folder1", "//folder2", "index.html"));
// console.log(path.join(__dirname, "../index.html"));

// console.log(path.resolve("folder1", "folder2", "index.html"));
// console.log(path.resolve("/folder1", "folder2", "index.html"));
// console.log(path.resolve("/folder1", "//folder2", "index.html"));
// console.log(path.resolve(__dirname, "../index.html"));
