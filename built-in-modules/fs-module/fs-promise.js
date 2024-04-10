const fs = require("fs/promises");

fs.readFile("./info.txt", "utf-8")
  .then((data) => {
    console.log("data", data);
  })
  .catch((error) => {
    console.log("error", error);
  });

async function readFile() {
  try {
    const data = await fs.readFile("./info.txt", "utf-8");
    console.log("data", data);
  } catch (error) {
    console.log("error", error);
  }
}

readFile();
