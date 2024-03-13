require("dotenv").config();
const connect = require("./db/connection");
const todoRouter = require("./routes/todoRoutes");
const authRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(fileUpload());

app.use("/users", userRouter);
app.use("/dashboard", dashboardRouter);
app.use("/todos", todoRouter);
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/reviews", reviewRouter);

app.use(errorMiddleware);

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
