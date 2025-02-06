const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;

// Generate access token
const generateAccessToken = (user) => {
  const payload = {
    id: user.id, // Unique identifier
    email: user.email, // email identifier
    role: user.role, // Authorization role
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Generate refresh token
const generateRefreshToken = (user) => {
  const payload = {
    id: user.id, // Unique identifier
    id: user.email, // email identifier
    role: user.role, // Authorization role
  };
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
