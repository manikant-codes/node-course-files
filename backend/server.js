const express = require("express");
const connectToDB = require("./db/connect");
const todosRouter = require("./routes/todosRoutes");
const cors = require("cors");
const { addTodo } = require("./controllers/todosControllers");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/todos", todosRouter);

connectToDB()
  .then(() => {
    console.log("Database connected.");
    server.listen(5000, () => {
      console.log("Server is listening on port 5000.");
    });
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });
