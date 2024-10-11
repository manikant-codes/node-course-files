const pagesValidator = (files, body) => {
  if (!files && !body.images) {
    throw new MyError("Images are required!", 404);
  }

  if (!body.name) {
    throw new MyError("Name required!", 404);
  }

  if (!body.slug) {
    throw new MyError("Slug required!", 404);
  }

  if (!body.subCategories) {
    throw new MyError("Sub-category is required!", 404);
  }

  if (body.subCategories && !Array.isArray(body.subCategories)) {
    throw new MyError("Sub-categories must be an array!", 404);
  }

  if (
    body.subCategories &&
    Array.isArray(body.subCategories) &&
    !body.subCategories.length
  ) {
    throw new MyError("Sub-category is required!", 404);
  }
};

module.exports = { pagesValidator };
