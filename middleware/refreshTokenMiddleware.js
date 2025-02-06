const jwt = require("jsonwebtoken");
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

module.exports = function (req, res, next) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh Token is required" });

  try {
    const verify = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    req.user = verify;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Refresh Token expired" });
    } else {
      return res.status(400).json({ message: "Invalid Refresh Token" });
    }
  }
};
