const { signJWT } = require("./jwtHelper");

const attachCookiesToResponse = (res, userTrimmed) => {
  const token = signJWT(userTrimmed);
  const expiry = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + expiry),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = attachCookiesToResponse;
