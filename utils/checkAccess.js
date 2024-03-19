const checkAccess = (userId, resourceUserId) => {
  if (userId === resourceUserId.toString()) return true;
  return false;
};

module.exports = checkAccess;
