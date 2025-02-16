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
    const messages = await ChatService.getMessages(userId, receiverId);
    return successResponse(res, 200, "Get message successfully", messages);
  } catch (error) {
    return errorResponse(res, error.cod || 500, error.message);
  }
};
