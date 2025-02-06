const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
} = require("../controllers/authController");
const refreshTokenMiddleware = require("../middleware/refreshTokenMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshTokenMiddleware, refreshToken);

module.exports = router;
