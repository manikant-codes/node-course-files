function logger(req, res, next) {
  console.log(new Date().toLocaleTimeString());
  next();
}

module.exports = logger;
