require("dotenv").config();
const express = require("express");
const connect = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());
// app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});
app.use("/auth", authRouter);
app.use("/users", userRouter);

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Database connected successfully!`);
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

start();
