// const fs = require("fs/promises");
const fs = require("fs");
const https = require("https");

// async function getAndStoreUsers() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const data = await response.json();
//   await fs.writeFile("./files/users/users.json", JSON.stringify(data));
// }

// getAndStoreUsers();

const url = "https://www.pexels.com/search/mountains/";

const writeStream = fs.createWriteStream("./image.html");

https
  .get(url, (res) => {
    res.on("data", (data) => {
      writeStream.write(data);
    });
  })
  .end();
