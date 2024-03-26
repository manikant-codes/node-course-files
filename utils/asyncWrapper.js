function asyncWrapper(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      // res.status(500).json({ success: false, msg: error.message });
      next(error);
    }
  };
}

module.exports = asyncWrapper;
