const os = require("os");

let fname = "manikant";

// console.log("__filename", __filename);
// console.log("__dirname", __dirname);

// const x = setTimeout(() => {
//   console.log("Mai chala!");
// }, 2000);

// const x = setInterval(() => {
//   console.log("Mai chala!");
// }, 1000);

// console.log("x", x);

// setTimeout(() => clearTimeout(x), 4000);

console.log("os.cpus()", os.cpus());
console.log("os.arch()", os.arch());
console.log("os.freemem()", os.freemem());
console.log("os.endianness()", os.endianness());
console.log("os.hostname()", os.hostname());
console.log("os.release()", os.release());
console.log("os.totalmem()", os.totalmem());
console.log("os.type()", os.type());
console.log("os.userInfo()", os.userInfo());
console.log("os.uptime()", os.uptime());
console.log("os.version()", os.version());
console.log("os.machine()", os.machine());

// module.exports = { name: fname, lname: "jha" };

// console.log("process", process.env.SECRET);
