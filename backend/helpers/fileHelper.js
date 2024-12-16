const path = require("path");

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

module.exports = { saveFile, deleteFile };
