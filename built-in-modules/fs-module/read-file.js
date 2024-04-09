const fs = require("fs");

// const fileContents = fs.readFileSync("./info.txt", "utf-8");

// const fileContents = fs.readFile("./info.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("Something went wrong!");
//   }
//   console.log("data", data);
// });

// console.log(fileContents);

fs.writeFileSync("./info-backup.txt", "Hello World!");

fs.writeFile("./info-backup.txt", "Hello World!", { flag: "a" }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success!");
  }
});
