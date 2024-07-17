const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "files", "info.json");

fetch("")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // To JSON File
    // const jsonData = JSON.stringify(data);
    // fs.writeFile(filePath, jsonData, (err) => {
    //   if (err) {
    //     return console.log("Error: ", err);
    //   }
    //   console.log("Write completed!");
    // });
    // To CSV File
    // let text = "";
    // text += Object.keys(data[0]).toString() + "\n";
    // for (const value of data) {
    //   text += Object.values(value).toString() + "\n";
    // }
    // fs.writeFile(filePath, text, (err) => {
    //   if (err) {
    //     return console.log("Error: ", err);
    //   }
    //   console.log("Write completed!");
    // });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
