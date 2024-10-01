const fs = require("fs/promises");
const path = require("path");
const MyError = require("./errorUtils");

const checkAndCreateDir = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    await fs.mkdir(path);
  }
};

const addFiles = async (images, pathToDir, baseURL) => {
  // Check if at least 2 images are there.
  if (
    !images ||
    !Array.isArray(images) ||
    (images && Array.isArray(images) && images.length < 2)
  ) {
    throw new MyError("At least 2 images are required!", 400);
  }

  // Check if folder exists in uploads if not create it.
  await checkAndCreateDir(pathToDir);

  const imagesURLs = [];

  for (const image of images) {
    const uniqueName = Date.now() + "-" + image.name;
    const uploadPath = path.join(pathToDir, uniqueName);
    await image.mv(uploadPath);
    imagesURLs.push(`${baseURL}/${uniqueName}`);
  }

  return imagesURLs;
};

module.exports = { checkAndCreateDir, addFiles };
