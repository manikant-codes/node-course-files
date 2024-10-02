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

const addSingleFile = async (image, folderName) => {
  const pathToFolder = path.join(__dirname, `../uploads/${folderName}`);
  const baseURL = `${process.env.BASE_URL}/uploads/${folderName}`;

  const uniqueName = Date.now() + "-" + image.name;
  await image.mv(path.join(pathToFolder, uniqueName));

  return `${baseURL}/${uniqueName}`;
};

const deleteSingleFile = () => {};

const addFiles = async (images, folderName) => {
  // Check if at least 2 images are there.
  if (!images || !Array.isArray(images)) {
    throw new MyError("Images are required!", 400);
  }

  const pathToFolder = path.join(__dirname, `../uploads/${folderName}`);
  const baseURL = `${process.env.BASE_URL}/uploads/${folderName}`;

  // Check if folder exists in uploads if not create it.
  await checkAndCreateDir(pathToFolder);

  const imagesURLs = [];

  for (const image of images) {
    const uniqueName = Date.now() + "-" + image.name;
    const uploadPath = path.join(pathToFolder, uniqueName);
    await image.mv(uploadPath);
    imagesURLs.push(`${baseURL}/${uniqueName}`);
  }

  return imagesURLs;
};

const deleteFiles = async (images, folderName, bodyImages = null) => {
  const pathToFolder = path.join(__dirname, `../uploads/${folderName}`);
  const filesInFolder = await fs.readdir(pathToFolder);

  if (bodyImages) {
    for (const image of images) {
      const name = path.parse(image).base;
      if (!bodyImages.includes(image)) {
        if (filesInFolder.includes(name)) {
          await fs.unlink(path.join(pathToFolder, name));
        }
      }
    }
  } else {
    for (const image of images) {
      const name = path.parse(image).base;
      if (filesInFolder.includes(name)) {
        await fs.unlink(path.join(filesInFolder, name));
      }
    }
  }
};

module.exports = {
  checkAndCreateDir,
  addSingleFile,
  deleteSingleFile,
  addFiles,
  deleteFiles,
};
