const CustomError = require("./customError");

function errorHandler(err, req, res, next) {
  const msg = err.message || "Something went wrong!";
  const status = err.status || 500;

  res.status(status).json({ success: false, msg });
}

module.exports = errorHandler;
