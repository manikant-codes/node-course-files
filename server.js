const express = require("express");
const userRouter = require("./routes/usersRoutes");
const productsRouter = require("./routes/productsRoutes");
const server = express();

server.use("/users", userRouter);
server.use("/products", productsRouter);

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
