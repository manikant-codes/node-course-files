const fs = require("fs/promises");
const path = require("path");

const addFile = async (file, folderName) => {
  const folderPath = path.join(__dirname, `../uploads/${folderName}`);
  const baseURL = `${process.env.BASE_URL}/uploads/${folderName}`;
  const uniqueName = Date.now() + "-" + file.name;

  await file.mv(path.join(folderPath, uniqueName));

  return `${baseURL}/${uniqueName}`;
};

const deleteFile = async (fileURL, folderName) => {
  const folderPath = path.join(__dirname, `../uploads/${folderName}`);
  const filesInFolder = await fs.readdir(folderPath);
  const fileName = path.parse(fileURL).base;

  if (filesInFolder.includes(fileName)) {
    await fs.unlink(path.join(folderPath, fileName));
  }
};

module.exports = { addFile, deleteFile };
