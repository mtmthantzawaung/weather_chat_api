const express = require("express");
const {
  sendMessage,
  getMessages,
  getRecentMessages,
} = require("../controllers/chatController");
const accessTokenMiddleware = require("../middleware/accessTokenMiddleware");

const router = express.Router();

router.post("/send", accessTokenMiddleware, sendMessage);
router.get("/recent/:userId", accessTokenMiddleware, getRecentMessages);
router.get("/:userId/:receiverId", accessTokenMiddleware, getMessages);

module.exports = router;
