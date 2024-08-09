const express = require("express");
const userRouter = require("./routes/usersRoutes");
const connectToDB = require("./db/connect");
const server = express();

server.use("/users", userRouter);

// then/catch
// connectToDB()
//   .then(() => {
//     console.log("Connected to the database!");
//     server.listen(5000, () => {
//       console.log("Server is listening on port 5000!");
//     });
//   })
//   .catch((error) => {
//     console.log("Error: ", error.message);
//   });

// async/await
async function start() {
  try {
    await connectToDB();
    console.log("Connected to the database!");
    server.listen(5000, () => {
      console.log("Server is listening on port 5000!");
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

start();
