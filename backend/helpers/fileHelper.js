const path = require("path");
const fs = require("fs/promises");

const saveFile = async (file, folderName) => {
  const fileName = Date.now() + "-" + file.name;
  const uploadPath = path.join(__dirname, "../uploads", folderName, fileName);
  await file.mv(uploadPath);
  return `http://localhost:5000/uploads/${folderName}/${fileName}`;
};

const deleteFile = async (url, folderName) => {
  const fileName = path.basename(url);
  const folderPath = path.join(__dirname, "../uploads", folderName);
  const filesInFolder = await fs.readdir(folderPath);

  if (filesInFolder.includes(fileName)) {
    await fs.unlink(path.join(folderPath, fileName));
  }
};

const saveMultipleFiles = async (files, folderName) => {
  const temp = [];

  for (const file of files) {
    const url = await saveFile(file, folderName);
    temp.push(url);
  }

  return temp;
};

const deleteMultipleFiles = async (urlsInDB, folderName, urlsInBody) => {
  if (urlsInBody) {
    // Update Case
    for (const url of urlsInDB) {
      if (!urlsInBody.includes(url)) {
        await deleteFile(url, folderName);
      }
    }
  } else {
    // Delete Case
    for (const url of urlsInDB) {
      await deleteFile(url, folderName);
    }
  }
};

module.exports = {
  saveFile,
  deleteFile,
  saveMultipleFiles,
  deleteMultipleFiles
};
