const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verify = jwt.verify(token, JWT_SECRET);
    req.user = verify;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
