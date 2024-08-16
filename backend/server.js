const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/usersRoutes");
const { start } = require("./helpers/serverHelper");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/users", userRouter);

start(server);
