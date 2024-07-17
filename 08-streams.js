const fs = require("fs");
const path = require("path");
const https = require("https");

https.get("https://www.w3schools.com/js/default.asp", (res) => {
  res.pipe(fs.WriteStream(path.join(__dirname, "files", "img.html")));

  // console.log(res);
});
