const CustomError = require("../services/customError");

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.id === resourceUserId.toString()) return;
  throw new CustomError("Permission denied!");
};

module.exports = checkPermission;
