const Category = require("../models/Category");
const MyError = require("../utils/errorUtils");

const pageValidator = async (body, files) => {
  if (!body.images && !files) {
    throw new MyError("Atleast one image is required!", 400);
  }

  if (!body.name) {
    throw new MyError("Name is required!", 400);
  }

  if (!body.slug) {
    const category = await Category.findOne({ slug: body.slug });
    if (!category) {
      throw new MyError("Invalid slug!", 400);
    }
    throw new MyError("Slug is required!", 400);
  }

  if (!body.title) {
    throw new MyError("Title is required!", 400);
  }
};

module.exports = pageValidator;
