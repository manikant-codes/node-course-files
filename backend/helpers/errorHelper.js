class MyError extends Error {
  constructor(message = "Something went wrong!", status = 500) {
    super(message);
    this.status = status;
  }
}

module.exports = { MyError };
