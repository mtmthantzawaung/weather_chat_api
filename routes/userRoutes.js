const express = require("express");
const User = require("../models/user");
const router = express.Router();
const accessTokenMiddleware = require("../middleware/accessTokenMiddleware");
const { getAllUsers } = require("../controllers/userController");

router.get("/", accessTokenMiddleware, getAllUsers);

module.exports = router;
