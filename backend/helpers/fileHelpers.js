const path = require("path");
const fs = require("fs/promises");

const saveFile = async (file, folderName) => {
  // const fileName = Date.now() + "-" + req.files.image.name;
  // const filePath = path.join(folderPath, fileName);
  // await req.files.image.mv(filePath);
  // const imageURL = `http://localhost:5000/uploads/category/${fileName}`;

  const fileName = Date.now() + "-" + file.name;
  const savePath = path.join(__dirname, "../uploads", folderName, fileName);
  await file.mv(savePath);
  return `http://localhost:5000/uploads/${folderName}/${fileName}`;
};

const deleteFile = async (url, folderName) => {
  // const toBeDeletedFileName = path.basename(category.image);
  // const filesInFolder = await fs.readdir(folderPath);
  // if (filesInFolder.includes(toBeDeletedFileName)) {
  //   await fs.unlink(filePath);
  // }

  const fileName = path.basename(url);
  const folderPath = path.join(__dirname, "../uploads", folderName);
  const filesInFolder = await fs.readdir(folderPath);

  if (filesInFolder.includes(fileName)) {
    const deletePath = path.join(folderPath, fileName);
    await fs.unlink(deletePath);
  }
};

module.exports = { saveFile, deleteFile };
