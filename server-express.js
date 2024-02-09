const express = require("express");
const app = express();
const path = require("path");
const productRouter = require("./routes/product");
const connect = require("./db/connection");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());

app.use("/product", productRouter);

app.use(errorHandler);

// app.get("/product", );

// app.get("/product/:id", logger, );

// app.put("/product/:id", );

// app.delete("/product/:id");

app.all("*", (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, "public", "not-found.html"));
});

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connected successfully!");
      console.log("Server is listening on port: ", PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the database!");
    console.log(err);
  });
