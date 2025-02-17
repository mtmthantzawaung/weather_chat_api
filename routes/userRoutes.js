const express = require("express");
const User = require("../models/user");
const router = express.Router();
const accessTokenMiddleware = require("../middleware/accessTokenMiddleware");
const { getAllUsers, getUserById } = require("../controllers/userController");

router.get("/", accessTokenMiddleware, getAllUsers);
router.get("/:userId", accessTokenMiddleware, getUserById);

module.exports = router;
