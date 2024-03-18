const asyncWrapper = (logic) => {
  return async (req, res, next) => {
    try {
      await logic(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
