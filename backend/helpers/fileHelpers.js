const fs = require("fs/promises");
const path = require("path");

const addFile = async (file, folderName) => {
  const folderPath = path.join(__dirname, `../uploads/${folderName}`);
  const baseURL = `${process.env.BASE_URL}/uploads/${folderName}`;
  const uniqueName = Date.now() + "-" + file.name;

  console.log("file", file);

  await file.mv(path.join(folderPath, uniqueName));

  return `${baseURL}/${uniqueName}`;
};

const addMultipleFiles = async (files, folderName) => {
  const folderPath = path.join(__dirname, `../uploads/${folderName}`);
  const baseURL = `${process.env.BASE_URL}/uploads/${folderName}`;

  const imagesURL = [];

  for (const file of files) {
    console.log("file", file);
    const uniqueName = Date.now() + "-" + file.name;
    await file.mv(path.join(folderPath, uniqueName));
    imagesURL.push(`${baseURL}/${uniqueName}`);
  }

  return imagesURL;
};

const deleteFile = async (fileURL, folderName) => {
  const folderPath = path.join(__dirname, `../uploads/${folderName}`);
  const filesInFolder = await fs.readdir(folderPath);
  const fileName = path.parse(fileURL).base;

  if (filesInFolder.includes(fileName)) {
    await fs.unlink(path.join(folderPath, fileName));
  }
};

const deleteMultipleFiles = async (filesURL, folderName) => {
  const folderPath = path.join(__dirname, `../uploads/${folderName}`);
  const filesInFolder = await fs.readdir(folderPath);

  for (const url of filesURL) {
    const fileName = path.parse(url).base;
    if (filesInFolder.includes(fileName)) {
      await fs.unlink(path.join(folderPath, fileName));
    }
  }
};

module.exports = { addFile, addMultipleFiles, deleteFile, deleteMultipleFiles };
