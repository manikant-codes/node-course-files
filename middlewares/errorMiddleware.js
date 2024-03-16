const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";

  res.status(statusCode).json({ succes: false, msg: message });
};

module.exports = errorMiddleware;
