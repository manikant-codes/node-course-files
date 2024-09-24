const fs = require("fs/promises");
const path = require("path");

const addFile = async (file, pathToDir, baseURL) => {
  const uniqueName = Date.now() + "-" + file.name;
  await file.mv(path.join(pathToDir, uniqueName));
  return `${baseURL}/${uniqueName}`;
};

const deleteFile = async (fileURL, pathToDir) => {
  const filesInDir = await fs.readdir(pathToDir);
  const fileName = path.parse(fileURL).base;
  if (filesInDir.includes(fileName)) {
    await fs.unlink(path.join(pathToDir, fileName));
  }
};

module.exports = { addFile, deleteFile };
