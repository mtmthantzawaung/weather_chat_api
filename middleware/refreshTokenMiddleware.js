const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseUtils");
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

module.exports = function (req, res, next) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return errorResponse(res, 401, "Refresh Token is required.");

  try {
    const verify = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    req.user = verify;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, 403, "Refresh Token expired");
    } else {
      return errorResponse(res, 401, "Invalid Refresh Token");
    }
  }
};
