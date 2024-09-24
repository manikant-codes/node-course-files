const categoryValidator = (files, body) => {
  console.log(files, body);
  if (!files && !body.image) {
    throw new Error("Image is required!");
  }

  if (!body.name.trim()) {
    throw new Error("Name is required!");
  }

  if (!body.slug.trim()) {
    throw new Error("Slug is required!");
  }
};

module.exports = { categoryValidator };
