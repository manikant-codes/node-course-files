const getFileName = (fileName) => {
  const arrFileName = fileName.split(".");
  return `${arrFileName[0]}_${Date.now()}.${arrFileName[1]}`;
};

module.exports = getFileName;
