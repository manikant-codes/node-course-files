const MyError = require("../utils/errorUtils");

const minTwoFilesValidator = (filesImages, bodyImages) => {
  if (
    (!filesImages && !bodyImages) ||
    (filesImages && !filesImages.length && !bodyImages) ||
    (!filesImages && bodyImages && bodyImages.length < 2)
  ) {
    throw new MyError("At least 2 product images are required!", 400);
  }
};

module.exports = { minTwoFilesValidator };
