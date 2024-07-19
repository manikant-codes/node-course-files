const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "folderOne", "folderTwo", "users.csv");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // To JSON File
    // fs.writeFile(filePath, JSON.stringify(data), (err) => {
    //   if (err) {
    //     return console.log("Error: ", err);
    //   }
    //   console.log("Write completed.");
    // });
    // To CSV File
    let text = "";
    text += Object.keys(data[0]).toString() + "\n";

    for (const value of data) {
      let temp = "";
      for (const key in value) {
        if (typeof value[key] === "object") {
          for (const k in value[key]) {
            temp += value[key][k] + "|";
          }
        } else {
          temp += value[key] + ",";
        }
      }
      temp += "\n";
      text += temp;
    }

    fs.writeFile(filePath, text, (err) => {
      if (err) {
        return console.log("Error: ", err);
      }
      console.log("Write completed.");
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
