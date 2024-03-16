const asyncWrapper = (logic) => {
  return async (req, res, next) => {
    try {
      logic(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
