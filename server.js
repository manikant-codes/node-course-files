require("dotenv").config();
const express = require("express");
const connect = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const usersRouter = require("./routes/usersRoutes");
const productsRouter = require("./routes/productsRoutes");
const reviewsRouter = require("./routes/reviewsRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const fileUpload = require("express-fileupload");
const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/reviews", reviewsRouter);

app.use(errorMiddleware);

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
