const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseUtils");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return errorResponse(res, 401, "Access Denied");

  try {
    const verify = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = verify;
    next();
  } catch (error) {
    return errorResponse(res, 401, "Invalid Token");
  }
};
