const users = [
  { id: 1, email: "manikant@gmail.com", password: "secret", role: "admin" },
];

function authMiddleware(req, res, next) {
  const user = users.find((value) => {
    return value.email === req.query.email;
  });

  if (!user || user.role !== "admin") {
    res.send("Invalid User");
  }

  const isMatch = req.query.password === user.password;

  if (!isMatch) {
    res.send("Invalid Password");
  }

  const username = req.query.email.split("@")[0];

  req.username = username;

  next();
}

module.exports = authMiddleware;
