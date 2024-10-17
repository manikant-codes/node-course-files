const path = require("path");

console.log("__dirname", __dirname);
console.log("__filename", __filename);

// basename()
// console.log("__dirname", path.basename(__dirname));
// console.log("__fileName", path.basename(__filename));

// isAbsolute()
// console.log("__dirname", path.isAbsolute(__dirname));
// console.log("./index.js", path.isAbsolute("./index.js"));

// parse()
// console.log("__dirname", path.parse(__dirname));
// console.log("__filename", path.parse(__filename));

// format()
// console.log(
//   "__dirname",
//   path.format({
//     root: "C:\\",
//     dir: "C:\\Users\\Lope Multimedia\\Desktop\\manikant",
//     base: "node-course-files",
//     ext: "",
//     name: "node-course-files"
//   })
// );
// console.log(
//   "__filename",
//   path.format({
//     root: "C:\\",
//     dir: "C:\\Users\\Lope Multimedia\\Desktop\\manikant\\node-course-files",
//     base: "02-path-module.js",
//     ext: ".js",
//     name: "02-path-module"
//   })
// );

// join();
// console.log("join", path.join(__dirname, "files", "users", "users.txt"));

// resolve()
// console.log("resolve", path.resolve(__dirname, "files", "users", "users.txt"));

// extname()
// console.log("__dirname", path.extname(__dirname));
// console.log("__filename", path.extname(__filename));

// dirname();
// console.log("__dirname", path.dirname(__dirname));
// console.log("__filename", path.dirname(__filename));

// relative()
// console.log(
//   "relative",
//   path.relative(
//     path.join(__dirname, "files", "users"),
//     path.join(__dirname, "index.js")
//   )
// );

// win32
// console.log("join", path.join(__dirname, "files"));
// console.log("win32 join", path.win32.join(__dirname, "files"));
