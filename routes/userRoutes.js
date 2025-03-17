const express = require("express");
const User = require("../models/User");
const router = express.Router();
const accessTokenMiddleware = require("../middleware/accessTokenMiddleware");
const { getAllUsers, getUserById, updateFcmToken, removeFcmToken } = require("../controllers/userController");

router.get("/", accessTokenMiddleware, getAllUsers);
router.get("/:userId", accessTokenMiddleware, getUserById);
router.post("/update-fcm-token", accessTokenMiddleware, updateFcmToken);
router.post("/remove-fcm-token", accessTokenMiddleware, removeFcmToken);

module.exports = router;
