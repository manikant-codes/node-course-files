const express = require("express");
const connect = require("./db/connect");
const todosRouter = require("./routes/todosRoutes");

const server = express();
server.use("/todos", todosRouter);

connect()
  .then(() => {
    console.log("Database connected.");
    server.listen(5000, () => {
      console.log("Server is listening on port 5000.");
    });
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });
