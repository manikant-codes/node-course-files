const express = require("express");
const productsRouter = require("./routes/productsRoutes");
const usersRouter = require("./routes/usersRoutes");

const server = express();
server.use("/products", productsRouter);
server.use("/users", usersRouter);

server.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});
