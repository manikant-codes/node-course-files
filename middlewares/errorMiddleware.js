function errorMiddleware(err, req, res, next) {
  const errStatusCode = err.statusCode || 500;
  const errMessage = err.message || "Internal server error!";

  res.status(errStatusCode).json({ success: false, msg: errMessage });
}

module.exports = errorMiddleware;
