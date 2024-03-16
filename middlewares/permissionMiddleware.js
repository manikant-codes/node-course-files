const permissionMiddleware = (req, res, next) => {
  const { user } = req;

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, msg: "Not allowed to access this route!" });
  }

  next();
};

module.exports = permissionMiddleware;
