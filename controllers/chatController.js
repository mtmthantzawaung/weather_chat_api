const ChatService = require("../services/chatService");
const { successResponse, errorResponse } = require("../utils/responseUtils");

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const chat = await ChatService.saveMessage(senderId, receiverId, message);
    return successResponse(res, 201, "Message sending successfully", chat);
  } catch (error) {
    return errorResponse(res, error.cod || 500, error.message);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId, receiverId } = req.params;
    console.log(userId, receiverId);
    console.log("user id from getm is", userId);
    const messages = await ChatService.getMessages(userId, receiverId);
    return successResponse(res, 200, "Get message successfully", messages);
  } catch (error) {
    return errorResponse(res, error.cod || 500, error.message);
  }
};

exports.getRecentMessages = async (req, res) => {
  try {
    console.log("test");
    const { userId } = req.params;
    console.log("user id is", userId);
    const messages = await ChatService.getRecentMessages(userId);
    return successResponse(
      res,
      200,
      "Get Recent message successfully",
      messages
    );
  } catch (error) {
    return errorResponse(res, error.cod || 500, error.message);
  }
};
