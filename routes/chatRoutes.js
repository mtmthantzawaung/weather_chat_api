const express = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");
const accessTokenMiddleware = require("../middleware/accessTokenMiddleware");

const router = express.Router();

router.post("/send", accessTokenMiddleware, sendMessage);
router.get("/:userId/:receiverId", accessTokenMiddleware, getMessages);

module.exports = router;
