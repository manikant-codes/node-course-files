const { MyError } = require("../helpers/errorHelper");

const categoryValidator = (files, body) => {
  if (!files && !body.image) {
    // throw new Error("Image is required!");
    throw new MyError("Image is required!", 404);
  }

  if (!body.name.trim()) {
    throw new MyError("Name is required!", 404);
  }

  if (!body.slug.trim()) {
    throw new MyError("Slug is required!", 404);
  }
};

module.exports = { categoryValidator };
