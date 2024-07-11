const os = require("os");

// console.log("arch", os.arch());
// console.log("arch", os.constants);
// console.log("arch", os.cpus());
console.log("arch", os.freemem() / 1024 / 1024 / 1024);
