const fs = require("fs");
const path = require("path");
const https = require("https");

const filePath = path.join(__dirname, "folderOne", "folderTwo", "img.jpg");

const url =
  "https://images.unsplash.com/photo-1721073686084-c06ae051872a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

https
  .get(url, (res) => {
    console.log(res.pipe(fs.WriteStream(filePath)));
  })
  .end();

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     // fs.writeFile(filePath, JSON.stringify(data), (err) => {
//     //   if (err) {
//     //     return console.log("Error: ", err);
//     //   }
//     //   console.log("Write completed.");
//     // });

//     let text = "";

//     text += Object.keys(data[0]).toString() + "\n";

//     for (const value of data) {
//       text += Object.values(value).toString() + "\n";
//     }

//     fs.writeFile(filePath, text, (err) => {
//       if (err) {
//         return console.log("Error: ", err);
//       }
//       console.log("Write completed.");
//     });
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });
