const path = require("path");
const fs = require("fs");

const filePath = path.join(
  __dirname,
  "uploads",
  "products",
  "trending-products",
  "encoding.png"
);

// const content = fs.readFileSync(folderPath /*,{encoding: "utf-8"}*/);
// console.log(content.toString());

fs.readFile(
  filePath,
  /*{encoding: "utf-8"},*/ (error, content) => {
    if (error) {
      return console.log("Error: ", error);
    }
    console.log(content.toString());
  }
);
