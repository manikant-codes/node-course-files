require("dotenv").config();
const express = require("express");
const connect = require("./db/connection");
const todoRouter = require("./routes/todoRoutes");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/todos", todoRouter);

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log("Connected successfully to the database!");
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (error) {
    console.log("Failed to connect to the database!");
  }
};

start();
