const { MyError } = require("../helpers/errorHelper");

const subCategoryValidator = (req) => {
  if (!req.body.image && !req.files) {
    throw new MyError("Image is required!", 400);
  }

  if (!req.body.name) {
    throw new MyError("Name is required!", 400);
  }

  if (!req.body.slug) {
    throw new MyError("Slug is required!", 400);
  }

  if (!req.body.category) {
    throw new MyError("category is required!", 400);
  }
};

module.exports = { subCategoryValidator };
