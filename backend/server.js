const express = require("express");

const cors = require("cors");
const userRouter = require("./routes/usersRoutes");
const connectToDB = require("./db/connect");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/users", userRouter);

connectToDB()
  .then(() => {
    console.log("Database connected!");
    server.listen(5000, () => {
      console.log("Server is listening on port 5000!");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
